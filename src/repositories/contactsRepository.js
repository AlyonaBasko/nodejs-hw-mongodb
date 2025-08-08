const contacts = [
  {
    id: 1,
    name: "Ірина Сидоренко",
    email: "iryna.sydorenko@example.com",
    phone: "+380631234567"
  },
  {
    id: 2,
    name: "Петро Гнатюк",
    email: "petro.gnatiuk@example.com",
    phone: "+380631112233"
  }
];

export const getAllContacts = async () => {
  return contacts;
};