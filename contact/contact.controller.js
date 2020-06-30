const Contact = require("./contact.modell");

const listContacts = async (req, res) => {
  const contacts = await Contact.listContacts();
  const { status, message } = contacts;

  /* Якщо в отриманому об'єкті є ключ "message",
  тоді під час обробки запиту виникла помилка */
  return message
    ? res.status(status).json({ message })
    : res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  /* Так як req.params.contactId повертає значення
  типу строка, а id контакту зберігається в БД 
  у форматі - число, тому отримане contactId 
  відразу перетворюємо в числове значення */
  const contactId = Number(req.params.contactId);
  const contact = await Contact.getContactById(contactId);

  /* Відокремлюємо інформацію, 
  щодо успішності запити та інформаці про помилку
  від інформації, яка міститься в базі даних */
  const { status, message, ...contactData } = contact;

  return message
    ? res.status(status).json({ message })
    : res.status(status).json(contactData);
};

const removeContact = async (req, res) => {
  const contactId = Number(req.params.contactId);
  const contacts = await Contact.removeContact(contactId);
  const { status, message } = contacts;
  res.status(status).json({ message });
};

const addContact = async (req, res) => {
  const newContactData = req.body;

  const newContact = await Contact.addContact(newContactData);
  const { status, message, ...contactData } = newContact;
  return message
    ? res.status(status).json({ message })
    : res.status(status).json(contactData);
};

const updateContact = async (req, res) => {
  const contactId = Number(req.params.contactId);
  const contactUpdateData = req.body;
  const isUpdeteKeys = Object.keys(contactUpdateData).length > 0;

  if (!isUpdeteKeys) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedContact = await Contact.updateContact({
    contactId,
    contactUpdateData,
  });
  const { status, message, ...updatedContactData } = updatedContact;

  return message
    ? res.status(status).json({ message })
    : res.status(status).json(updatedContactData);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
