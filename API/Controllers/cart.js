import { Cart } from "../Models/Cart.js";

// add To Cart
export const addToCart = async (req, res) => {
  
  const { productId, title, price, qty, imgSrc } = req.body;

  const userId = req.user._id;

  // console.log("User id in addto cart",userId)

  let cart = await Cart.findOne({ userId});

  if (!cart) {
    cart = new Cart({ userId, items: [] }); 
  }
   
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
 
  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty; 
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();
  res.json({ message: "Items Added To Cart", cart });
};

// get User Cart
export const userCart = async (req,res) =>{
  // console.log("USerID in uCart", req.user)
   const userId = req.user._id;
  //  console.log("User id in user cart", userId)

   let cart = await Cart.findOne({userId});
   if(!cart) return res.json({messge:'Cart not found'})

    res.json({message:"user cart",cart})
}

//remove product from cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user;

  try {
      // Find the cart for the user
      let cart = await Cart.findOne({ userId });

      // Check if the cart exists
      if (!cart) return res.status(404).json({ message: 'Cart not found' });

      // Filter out the product by comparing the string version of productId
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

      // Save the updated cart
      await cart.save();

      // Respond with success
      return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
      console.error('Error removing product from cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

//Clear cart
export const clearCart = async (req,res) => {
     const userId = req.user
    let cart = await Cart.findOne({userId})

    if(!cart){
        cart = new Cart({items:[]})
    } else {
        cart.items = []
    }

    await cart.save()

    res.json({message: "Cart cleared"})
}

//Decrease Quantity
export const decreaseProudctQty = async (req, res) => {
    const { productId, qty} = req.body;
  
    const userId = req.user;
  
    let cart = await Cart.findOne({ userId });
   
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      // return res.json({messge:'Cart not find'})
    }
  
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
  
    if (itemIndex > -1) {
      const item = cart.items[itemIndex]
  
      if(item.qty > qty){
          const pricePerUnit = item.price/item.qty
  
          item.qty -= qty
          item.price -= pricePerUnit*qty
      }else{
          cart.items.splice(itemIndex,1)
      }
  
    } else {
      return res.json({messge:'invalid product Id'})
    } 
  
    await cart.save();
    res.json({ message: "Items qty decreased", cart });
  };
