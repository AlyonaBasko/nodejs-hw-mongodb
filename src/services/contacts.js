import Contact from '../models/contact.js';
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from '../constants/index.js';


export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "name",
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = Contact.find({ userId }); 
  const totalItems = await Contact.countDocuments({ userId }); 

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};


export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};


export const createContact = async (contactData, userId) => {
  const contact = new Contact({ ...contactData, userId });
  const savedContact = await contact.save();
  return savedContact.toObject({ versionKey: false });
};


export const patchContact = async (contactId, userId, updateData) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true }
  );
};


export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
