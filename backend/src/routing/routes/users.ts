import { Router, Request, Response } from 'express';
import { SessionController } from '../../controller/sessions';
import { UserController } from '../../controller/users';

export class UserRoutes {
    public router: Router = Router();
    private sessionController: SessionController;
    private userController: UserController;

    /**
     * @author Madelief van Slooten
     * User route class that takes two controller classes. One for the users and one for the sessions.
     * @param sessionController
     * @param userController
     */
    public constructor(sessionController: SessionController, userController: UserController) {
        this.sessionController = sessionController;
        this.userController = userController;
        this.setUserRoutes(this.router);
    }

    /**
     * @author Madelief van Slooten
     * sets the routes for the user structure.
     * @param router Router
     */
    private setUserRoutes(router: Router): void {
        router.post('/', (request: Request, response: Response) => {
            this.userController.addUser(request, response);
        });

        router.patch('/:id', (request: Request, response: Response) => {
            this.userController.updateUser(request, response);
        });

        router.get('/:id', (request: Request, response: Response) => {
            this.userController.getUserById(request, response);
        });

        router.get('/:id/usertype', (request: Request, response: Response) => {
            this.userController.getUserType(request, response);
        });

        router.delete('/', (request: Request, response: Response) => {
            this.sessionController.deleteSession(request, response);
        });
    }
}
