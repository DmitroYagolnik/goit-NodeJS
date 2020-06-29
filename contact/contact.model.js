import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  subscription: String,
  password: String,
  token: String,
});

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  /* "query" вказано, щоб мати змогу для пошуку контактів
  за заданими "query-запитами" */
  listContacts(query) {
    return this.contact.find(query);
  }

  getContactById(id) {
    return (
      this.contact
        .findById(id)
        .then((contact) => contact)
        // Якщо контакт не знайдено - вернеться null
        .catch(() => null)
    );
  }

  removeContact(id) {
    return this.contact.findByIdAndDelete(id);
  }

  addContact(contact) {
    const newContact = { ...contact, token: "" };
    return this.contact.create(newContact);
  }

  updateContact(contact) {
    const { contactId, contactUpdateData } = contact;
    return this.contact
      .findByIdAndUpdate(contactId, contactUpdateData, {
        new: true,
      })
      .then((contact) => contact)
      .catch(() => null);
  }
}

export default new Contact();
