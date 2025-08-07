import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const seedContactsInDB = async () => {
  const seedData = [
    {
      name: 'Ihor Bondarenko',
      phoneNumber: '+3000000030',
      email: 'ihor.bondarenko@example.com',
      isFavourite: false,
      contactType: 'work',
    },
    {
      name: 'Svitlana Kravchenko',
      phoneNumber: '+30000000010',
      email: 'svitlana.kravchenko@example.com',
      isFavourite: true,
      contactType: 'personal',
    },
  ];
  return await Contact.insertMany(seedData);
};