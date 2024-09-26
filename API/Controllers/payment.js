import { Payment } from "../Models/Payment.js";
import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PySvJHBWUV9Y1rp4FzVjomLoYK9Q95pZv6pWIzsdc4wkRrUp5FZ90nwlETmdne9y6jqMfHCpCcg69NHn7oHWGpb00KpfV6WAa"
); // Use your Stripe secret key

const router = express.Router();

export const checkout = async (req, res) => {
  const { cartItems, userShipping, userId } = req.body;

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });
  // console.log(req.body)
  /*  console.log("Items in cart", cartItems)
  console.log("User shipping", userShipping)
  console.log("user Id", userId) */

  try {
    // Create line items based on cartItems
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.title,
          images: [item.imgSrc],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    }));

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "IN", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "INR",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "INR",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        userId: userId,
        userShipping: JSON.stringify(userShipping),
      },
      //  payStatus : 'created'
    });

    // Respond with the session ID
    res.json({
      id: session.id,
    });


    //Stripe webhook

    let endpointSecret;

    endpointSecret =
      "whsec_21b50720a844f0e3b68d8a078c4cd3bf77a27742881eae9c56d4e7125854994d";
    // whsec_21b50720a844f0e3b68d8a078c4cd3bf77a27742881eae9c56d4e7125854994d

    router.post(
      "/webhook",
      express.raw({ type: "application/json" }),
     async (req, res) => {
        const sig = req.headers["stripe-signature"];

        let data;
        let eventType;

        if (endpointSecret) {
          let event;

          try {
            event = stripe.webhooks.constructEvent(
              req.body,
              sig,
              endpointSecret
            );
            console.log("Webhook verified.");
          } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
          }

          //Extract object from the event
          data = event.data.object;
          eventType = event.type;
        } else {
          data = req.body.data.object;
          eventType = req.body.type;
        }

        //Handle the event

        if (eventType === "checkout.session.completed") {
          stripe.customers.retrieve(data.customer)
          .then((customer) => {
            console.log(customer);
            console.log("DATA", data)
          }).catch(err => console.log(err.message));
        }

        //Return a 200 res to acknowledge receipt of the event
        res.send().end()
      }
    );
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
};

export const verify = async (req, res) => {
  /* const { orderId, paymentId, signature, amount, orderItems, userId, userShipping } = req.body

  let orderConfirm = await Payment.create({
    orderId, 
    paymentId, 
    signature, 
    amount, 
    orderItems, 
    userId, 
    userShipping,
    payStatus : 'paid'
  })

  res.json({message:'Payment successful...', success:true, orderConfirm})
 */
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    // Replace 'req.body' with the raw req body
    event = stripe.webhooks.constructEvent(req.rawBody, sig);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      // Save payment to the database
      const payment = new Payment({
        orderId: paymentIntent.id,
        payStatus: "Completed",
        orderDate: new Date(),
        amount: paymentIntent.amount / 100, // Convert back to normal currency unit
        userId: paymentIntent.metadata.userId,
        userShipping: JSON.parse(paymentIntent.metadata.userShipping), // Convert back to object
        cartItems: JSON.parse(paymentIntent.metadata.cartItems), // Convert back to array
      });

      await payment.save();

      res
        .status(200)
        .json({ message: "Payment verified and saved successfully" });
      break;

    case "payment_intent.payment_failed":
      // Handle failed payments here
      res.status(200).json({ message: "Payment failed" });
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
      res.status(400).json({ message: `Unhandled event type ${event.type}` });
  }
};

export default router;
