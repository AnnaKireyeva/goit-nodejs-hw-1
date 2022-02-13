const fs = require("fs/promises");
const path = require("path");
// const { randomUUID } = require("crypto");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const readContent = async () => {
  const content = await fs.readFile(contactsPath, "utf-8");
  const resultContent = JSON.parse(content);
  return resultContent;
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  if (!contactId) {
    console.log("Please enter id");
    return "";
  }
  const contacts = await readContent();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    console.log(`Id ${contactId} is not found`);
    return "";
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

async function addContact(name, email, phone) {
  const contacts = await readContent();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
