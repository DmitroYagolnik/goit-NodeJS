const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./", "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const contactFound = contacts.find((contact) => contact.id === contactId);
    if (contactFound) {
      console.log(contactFound);
      return;
    }

    console.log(`Contact from id ${contactId} not found!`);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex > -1) {
      // Буде використано для повідомлення про успішне видалення
      const contact = contacts[contactIndex];

      contacts.splice(contactIndex, 1);
      fs.writeFileSync(contactsPath, JSON.stringify(contacts), "utf8");
      console.log(`Contact:
      name:   ${contact.name}
      email:  ${contact.email}
      phone:  ${contact.phone}
- successfully deleted!`);
      return;
    }
    console.log(
      `Error deleting contact: Contact from id ${contactId} not found!`
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    if (name && email && phone) {
      const contacts = JSON.parse(data);
      const newContact = {
        id: contacts.length + 1,
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      fs.writeFileSync(contactsPath, JSON.stringify(contacts), "utf8");
      console.log(`Contact:
        name:   ${newContact.name}
        email:  ${newContact.email}
        phone:  ${newContact.phone}
- successfully created!`);
      return;
    }
    console.log(
      "Error creating new contact: Not all parameters for creating a contact were specified!"
    );
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
