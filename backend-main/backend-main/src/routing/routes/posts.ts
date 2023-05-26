import { Router, Request, Response } from 'express';
import { PostController } from '../../controller/posts';

export class PostRoutes {
    public router: Router = Router();
    private postController: PostController;

    public constructor(postController: PostController) {
        this.postController = postController;
        this.setPostRoutes(this.router);
    }

    /**
     * @author Madelief van Slooten
     * sets the routes for the post structure.
     * @param router Router
     */
    private setPostRoutes(router: Router): void {
        router.post('/', (request: Request, response: Response) => {
            this.postController.create(request, response);
        });

        router.get('/', (request: Request, response: Response) => {
            this.postController.findAll(request, response);
        });
    }
}
