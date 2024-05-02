const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const listOfContacts = await contacts.getListOfContacts();
        console.table(listOfContacts);
        break;

      case "get":
        const oneContact = await contacts.getContactById(id);
        console.table(oneContact);
        break;

      case "add":
        await contacts.addContact(name, email, phone);
        console.log("Contact added successfully!");
        break;

      case "remove":
        await contacts.removeContact(id);
        console.log("Contact removed successfully!");
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(`Error performing action: ${error.message}`);
  }
}

invokeAction(argv);
