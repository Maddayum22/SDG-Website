/** @author Madelief van Slooten & Rowen Zaal */

import { Router, Request, Response } from "express";
import { Server } from "../../server";
const router: Router = Router();

// Creates a new user.
router.post("/users", (request: Request, response: Response) => {
  Server.getInstance().userController.addUser(request, response);
});

// Retrieve the details of the user, in this case the usertype.
router.get("/users/:id", (request: Request, response: Response) => {
  Server.getInstance().userController.getUserType(request, response);
});

//Deletes the session of the logged in user
router.delete("/users", (request: Request, response: Response) => {
  Server.getInstance().sessionController.deleteSession(request, response);
});

export default router;
