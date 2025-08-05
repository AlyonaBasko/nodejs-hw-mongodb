import  Contact  from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find(); // отримує всі контакти
};