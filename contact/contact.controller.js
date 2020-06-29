import Contact from "./contact.model";

export const listContactsController = async (req, res) => {
  try {
    const contacts = await Contact.listContacts(req.query);
    const successfulContactsSearch = contacts.length > 0;
    return successfulContactsSearch
      ? res.status(200).json(contacts)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error).send(error);
  }
};

export const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contact.getContactById(contactId);

    return contact
      ? res.status(200).json(contact)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error).send(error);
  }
};

export const removeContactController = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const removedContact = await Contact.removeContact(contactId);
    return removedContact
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json(error).send(error);
  }
};

export const addContactController = async (req, res) => {
  const newContactData = req.body;
  try {
    const newContact = await Contact.addContact(newContactData);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateContactController = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contactUpdateData = req.body;
    const isUpdeteKeys = Object.keys(contactUpdateData).length > 0;

    if (!isUpdeteKeys) {
      return res.status(400).json({ message: "missing fields" });
    }

    const updatedContact = await Contact.updateContact({
      contactId,
      contactUpdateData,
    });
    console.log("updatedContact", updatedContact);
    return updatedContact
      ? res.status(200).json(contact)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json(error).send(error);
  }
};
