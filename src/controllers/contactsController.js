import { getAllContacts, getContactById } from '../services/contacts.js';
import { seedContactsInDB } from '../services/contacts.js';

export const handleGetAllContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};


export const seedContacts = async (req, res, next) => {
  try {
    const contacts = await seedContactsInDB();
    res.status(201).json({
      status: 201,
      message: 'Seeded test contacts successfully!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};
