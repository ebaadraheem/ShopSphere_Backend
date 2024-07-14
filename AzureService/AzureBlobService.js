import { BlobServiceClient } from '@azure/storage-blob';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Load the Azure Storage connection string from environment variables
dotenv.config();
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER;

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Multer setup for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

const uploadImage = async (file) => {
  try {
    const blobName = uuidv4() + '-' + file.originalname;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const deleteImage = async (blobName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.delete();
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

const getImageUrl = (blobName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
};

export { upload, uploadImage, deleteImage, getImageUrl };
