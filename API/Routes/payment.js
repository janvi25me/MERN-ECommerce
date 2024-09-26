import express from 'express'
import {checkout, verify} from '../Controllers/payment.js'


const router = express.Router()

//checkout payment
router.post('/checkout-session', checkout)

//verify payment & save to DB
router.post('/verify-payment', verify)

//webhook
// router.post('/webhook', webhookStripe)

export default router