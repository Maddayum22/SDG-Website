/** @author Madelief van Slooten, Rowen Zaal & William Nguyen */

import { Router, Request, Response } from 'express';
import { Server } from '../../server';
const router: Router = Router();

// Creates a new user.
router.post('/users', (request: Request, response: Response) => {
    Server.instance.userController.addUser(request, response);
});

router.patch('/users/account/edit/:id', (request: Request, response: Response) => {
    Server.instance.userController.updateUser(request, response);
});

router.get('/users/account/:id', (request: Request, response: Response) => {
    Server.instance.userController.getUserById(request, response);
});

// Retrieve the details of the user, in this case the usertype.
router.get('/users/:id', (request: Request, response: Response) => {
    Server.instance.userController.getUserType(request, response);
});

//Deletes the session of the logged in user
router.delete('/users', (request: Request, response: Response) => {
    Server.instance.sessionController.deleteSession(request, response);
});

export default router;
