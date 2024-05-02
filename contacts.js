const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

function generateUniqueId() {
  const currentDate = new Date().toISOString();
  const random = Math.floor(Math.random() * 10000);
  return `${currentDate}-${random}`;
}

async function getListOfContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    throw new Error(`Error getting list of contacts: ${error.message}`);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getListOfContacts();
    const oneContact = contacts.find((item) => item.id === contactId);
    return oneContact || null;
  } catch (error) {
    throw new Error(`Error getting contact by ID: ${error.message}`);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getListOfContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    throw new Error(`Error removing contact: ${error.message}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getListOfContacts();
    const newContact = {
      id: generateUniqueId(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error(`Error adding contact: ${error.message}`);
  }
}

module.exports = {
  getListOfContacts,
  getContactById,
  removeContact,
  addContact,
};
