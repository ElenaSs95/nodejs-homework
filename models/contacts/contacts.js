const shortid = require("shortid");

const { writeDataInFile, readContactsFromFile } = require("../");

const listContacts = async () => {
  const contacts = await readContactsFromFile();
  const contactsList = contacts.map((contact) => contact.name);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contacts = await readContactsFromFile();
  const filteredContact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!filteredContact) {
    return null;
  }
  return filteredContact;
};

const removeContact = async (contactId) => {
  const contacts = await readContactsFromFile();

  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  await writeDataInFile(filteredContacts);
  return contacts[idx];
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContactsFromFile();
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeDataInFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContactsFromFile();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      return { ...contact, ...body };
    } else {
      return contact;
    }
  });
  await writeDataInFile(updatedContacts);
  return updatedContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
