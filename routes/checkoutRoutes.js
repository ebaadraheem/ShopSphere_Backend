import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/checkout', async (req, res) => {
    try {
        const products = req.body.products;
        console.log(products);
        console.log("Backend here");
        const lineItems = products.map((product) => {
          return {
            price_data: {
              currency: 'pkr',
              product_data: {
                name: product.name,
                images: [product.img],
              },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: product.total,
          };
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.Frontend_URL}/payment`,
            cancel_url: `${process.env.Frontend_URL}/shoppingcart`,
          });
        res.send({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
});
export default router;