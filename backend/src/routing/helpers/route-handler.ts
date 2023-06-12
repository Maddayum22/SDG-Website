import { Router } from 'express';
import { PostRoutes } from '../routes/posts';
import { SessionRoutes } from '../routes/sessions';
import { UserRoutes } from '../routes/users';
import { SessionController } from '../../controller/sessions';
import { PostController } from '../../controller/posts';
import { UserController } from '../../controller/users';

export interface ServerDependencies {
    postController: PostController;
    sessionController: SessionController;
    userController: UserController;
}

/**
 * @author Madelief van Slooten
 * Route handler using route classes.
 */
export class RouteHandler {
    public constructor() {}

    /**
     *@author Madelief van Slooten
     * @param serverDependencies Serverdependencies is an interface that makes sure the right controllers are used. This fixed the issue for some circular depenency.
     * @returns Router with the correct route classes.
     */
    public static handleRoutes(serverDependencies: ServerDependencies): Router {
        const router: Router = Router();
        router.use('/posts', new PostRoutes(serverDependencies.postController).router);
        router.use(
            '/sessions',
            new SessionRoutes(serverDependencies.sessionController, serverDependencies.userController).router
        );
        router.use(
            '/users',
            new UserRoutes(serverDependencies.sessionController, serverDependencies.userController).router
        );
        return router;
    }
}
