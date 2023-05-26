import { Router, Request, Response } from 'express';
import { SessionController } from '../../controller/sessions';
import { UserController } from '../../controller/users';

export class SessionRoutes {
    public router: Router = Router();
    private sessionController: SessionController;
    private userController: UserController;

    public constructor(sessionController: SessionController, userController: UserController) {
        this.sessionController = sessionController;
        this.userController = userController;
        this.setSessionRoutes(this.router);
    }

    /**
     * @author Madelief van Slooten
     * sets the routes for the session structure.
     * @param router Router
     */
    private setSessionRoutes(router: Router): void {
        router.post('/', (request: Request, response: Response) => {
            this.userController.authenticateUser(request, response);
        });

        router.get('/', (request: Request, response: Response) => {
            this.sessionController.checkSession(request, response);
        });
    }
}
