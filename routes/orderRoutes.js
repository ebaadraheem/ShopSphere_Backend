// routes/orderRoutes.js
import express from 'express';
import { AllOrderData, addDataToOrder,removeDatafromOrder } from '../Requests/OrderRequests.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    await addDataToOrder(req.body);
    res.send({success:true});
  } catch (error) {
    res.status(500).json({ error: 'Error adding data to orders' });
  }
});

router.post('/remove', async (req, res) => {
  try {
    await removeDatafromOrder(req.body.id);
    res.send("Favorite removed");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const data = await AllOrderData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
