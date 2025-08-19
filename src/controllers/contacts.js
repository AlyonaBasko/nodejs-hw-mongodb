import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import createError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

// GET /contacts
export const handleGetAllContacts = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);

    const contacts = await getAllContacts({ page, perPage });
    
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// GET /contacts/:contactId
export const handleGetContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// POST /contacts
export const handleCreateContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      "Missing required fields: name, phoneNumber, contactType"
    );
  }

  const newContact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact, 
  });
};


// PATCH /contacts/:contactId
export const handlePatchContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await patchContact(contactId, req.body);

    if (!updatedContact) {
      throw createError(404, "Contact not found");
    }

    res.status(200).json({
      status: 200,
      message: "Successfully patched a contact!",
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
// DELETE /contacts/:contactId
export const handleDeleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleted = await deleteContact(contactId);

    if (!deleted) {
      throw createError(404, "Contact not found");
    }

    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};


