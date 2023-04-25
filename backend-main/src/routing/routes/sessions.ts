/** @author Rowen Zaal & Madelief van Slooten */ // Session routing

import { Router, Request, Response } from "express";
import { Server } from "../../server";

const router: Router = Router();

// Creates a new session
router.post("/sessions", (request: Request, response: Response) => {
  Server.getInstance().userController.authenticateUser(request, response);
});

// Checks if a session exists
router.get("/sessions", (request: Request, response: Response) => {
  Server.getInstance().sessionController.checkSession(request, response);
});

export default router;
