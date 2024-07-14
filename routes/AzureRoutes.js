
import express from 'express';
import { upload,uploadImage,deleteImage,getImageUrl } from '../AzureService/AzureBlobService';
const router = express.Router();

// Route to upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const url = await uploadImage(req.file);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete an image
router.delete('/delete/:blobName', async (req, res) => {
  try {
    await deleteImage(req.params.blobName);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get image URL
router.get('/image/:blobName', (req, res) => {
  try {
    const url = getImageUrl(req.params.blobName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
