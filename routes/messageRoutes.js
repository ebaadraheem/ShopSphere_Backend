import express from "express";

import { addDataToMessage,removeDatafromMessage,AllMessageData } from "../Requests/MessageFunctions.js";
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    await addDataToMessage(req.body);
    res.send("message are added");
  } catch (error) {
    res.status(500).json({ error: 'Error adding data to message' });
  }
});
router.post('/remove', async (req, res) => {
  try {
    await removeDatafromMessage(req.body.id);
    res.send("message is removed");
  } catch (error) {
    res.status(500).json({ error: 'Error removing data from message' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const data = await AllMessageData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;