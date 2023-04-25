/** @author Madelief van Slooten & Rowen Zaal */ // Post routing

import { Router, Request, Response } from "express";
import { Server } from "../../server";

const router: Router = Router();

/** @author Madelief van Slooten & Rowen Zaal */
router.post("/posts", (request: Request, response: Response) => {
  Server.getInstance().postController.create(request, response);
});

/** @author Madelief van Slooten & Rowen Zaal */
router.get("/posts", (request: Request, response: Response) => {
  Server.getInstance().postController.findAll(request, response);
});

export default router;
