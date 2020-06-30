const fs = require("fs");
const path = require("path");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const contactsPath = path.join(__dirname, "../", "db", "contacts.json");

const listContacts = async () => {
  try {
    const contactsDB = await readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsDB);
    return contacts;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const successfullyReadDB = Array.isArray(contacts);

    if (successfullyReadDB) {
      const findedContact = contacts.find(
        (contact) => contact.id === contactId
      );

      /* Повертаємо об'єкт з інформацією про контакт,
      що міститься в базі даних.
      Додатково в об'єкт поміщаємо інформацію про статус 
      обробки запиту, і у разі виникнення помилки - 
      інформацію про помилку*/
      return findedContact
        ? { ...findedContact, status: 200 }
        : { status: 404, message: "Not found" };
    }
    /* Якщо не вдалося прочитати файл з бази даних,
      тоді після виконання функції listContacts() -
      змінна contacts буде містити в собі об'єкт
      з повідомленням про помилку */
    return contacts;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const successfullyReadDB = Array.isArray(contacts);

    if (successfullyReadDB) {
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );

      if (contactIndex > -1) {
        contacts.splice(contactIndex, 1);
        await writeFile(contactsPath, JSON.stringify(contacts), "utf8");
        return { status: 200, message: "contact deleted" };
      }

      return { status: 404, message: "Not found" };
    }
    return contacts;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const successfullyReadDB = Array.isArray(contacts);

    if (successfullyReadDB) {
      if (name && email && phone) {
        const newContact = {
          id: contacts.length + 1,
          name,
          email,
          phone,
        };
        contacts.push(newContact);
        await writeFile(contactsPath, JSON.stringify(contacts), "utf8");
        return { ...newContact, status: 201 };
      }
      return { status: 400, message: "missing required name field" };
    }
    return contacts;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const updateContact = async ({ contactId, contactUpdateData }) => {
  try {
    const contacts = await listContacts();
    const successfullyReadDB = Array.isArray(contacts);
    if (successfullyReadDB) {
      const currentContactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );

      if (currentContactIndex > -1) {
        const contactOldData = contacts[currentContactIndex];
        const updatedContact = { ...contactOldData, ...contactUpdateData };
        contacts.splice(currentContactIndex, 1, updatedContact);
        await writeFile(contactsPath, JSON.stringify(contacts), "utf8");

        return { ...updatedContact, status: 200 };
      }

      return { status: 404, message: "Not found" };
    }

    return contacts;
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
