// routes/imageRoutes.js
import express from 'express';
import { upload, uploadImage, deleteImage, getImageUrl } from '../AzureService/AzureBlobService.js';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const url = await uploadImage(req.file);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:blobName', (req, res) => {
  try {
    const url = getImageUrl(req.params.blobName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:blobName', async (req, res) => {
  try {
    await deleteImage(req.params.blobName);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
