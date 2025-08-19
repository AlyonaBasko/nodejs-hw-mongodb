import Contact from '../models/contact.js';
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = Contact.find();

  const totalItems = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (contactData) => {
  const contact = new Contact(contactData);
  const savedContact = await contact.save();
  return savedContact.toObject({ versionKey: false }); 
};

export const patchContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};