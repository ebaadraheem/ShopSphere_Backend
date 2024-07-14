// routes/dataRoutes.js
import express from 'express';
import { addDataToCards, AllData,removeDatafromCards, UpdateDatainCards } from '../Requests/RequestFunctions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    await addDataToCards(req.body);
    res.send("Cards are added");
  } catch (error) {
    res.status(500).json({ error: 'Error adding data to cards' });
  }
});
router.post('/remove', async (req, res) => {
  try {
    await removeDatafromCards(req.body.id);
    res.send("Cards is removed");
  } catch (error) {
    res.status(500).json({ error: 'Error removing data from cards' });
  }
});
router.post('/update', async (req, res) => {
  try {
    await UpdateDatainCards(req.body.name,req.body.size,req.body.quantity);
    res.send("Cards is update");
  } catch (error) {
    res.status(500).json({ error: 'Error updating data in cards' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const data = await AllData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
