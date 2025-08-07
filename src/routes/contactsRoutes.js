import express from 'express';
import { handleGetAllContacts, handleGetContactById } from '../controllers/contactsController.js';
import { seedContacts } from '../controllers/contactsController.js';

const router = express.Router();

router.get('/seed', seedContacts);
router.get('/', handleGetAllContacts);
router.get('/:contactId', handleGetContactById);

export default router;
