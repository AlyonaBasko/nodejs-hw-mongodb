import express from 'express';
import { handleGetAllContacts } from '../controllers/contactsController.js';

const router = express.Router();

// GET /contacts
router.get('/', handleGetAllContacts);

export default router;