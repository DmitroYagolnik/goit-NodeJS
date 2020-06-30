const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contact.controller");

const contactRouter = express.Router();

contactRouter.get("/", listContacts);
contactRouter.get("/:contactId", getContactById);
contactRouter.delete("/:contactId", removeContact);
contactRouter.post("/", addContact);
contactRouter.patch("/:contactId", updateContact);

exports.contactRouter = contactRouter;
