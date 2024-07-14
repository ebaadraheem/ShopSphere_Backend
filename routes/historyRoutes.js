import express from "express"

import { addDataToOrderHistory,removeDatafromOrderHistory,AllOrderHistoryData } from "../Requests/OrderRequests.js";
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
      await addDataToOrderHistory(req.body);
      res.send("Order added");
    } catch (error) {
      res.status(500).json({ error: 'Error adding data to orders' });
    }
  });
  
  router.post('/remove', async (req, res) => {
    try {
      await removeDatafromOrderHistory(req.body.id);
      res.send("Favorite removed");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/all', async (req, res) => {
    try {
      const data = await AllOrderHistoryData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  export default router;