import { Router } from "express";
import {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
} from "./contact.controller";
import { createContacValidateMiddleware } from "./contact.validator";

const contactRouter = Router();

contactRouter.get("/", listContactsController);
contactRouter.get("/:contactId", getContactByIdController);
contactRouter.delete("/:contactId", removeContactController);
contactRouter.post("/", createContacValidateMiddleware, addContactController);
contactRouter.patch("/:contactId", updateContactController);

export default contactRouter;
