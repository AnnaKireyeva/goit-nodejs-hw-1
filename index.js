const { Command } = require("commander");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContactById,
} = require("./contact");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContacts = await removeContact(id);
      console.table(removedContacts);
      break;
    case "update":
      const updatedContact = await updateContactById(id, name, email, phone);
      if (!updatedContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
