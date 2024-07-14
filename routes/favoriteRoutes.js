// routes/favoriteRoutes.js
import express from 'express';
import { addDataToFavourite, RemoveDatafromFavourite, getAllFavouriteData } from '../Requests/RequestFunctions.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    await addDataToFavourite(req.body.id, req.body.favdata);
    res.send("Favorite added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/remove', async (req, res) => {
  try {
    await RemoveDatafromFavourite(req.body.id, req.body.favdata);
    res.send("Favorite removed");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await getAllFavouriteData(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
