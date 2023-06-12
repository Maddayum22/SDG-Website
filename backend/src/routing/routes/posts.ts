import { Router, Request, Response } from 'express';
import { PostController } from '../../controller/posts';

export class PostRoutes {
    public router: Router = Router();
    private postController: PostController;

    /**
     * @author Madelief van Slooten
     * Post route class that takes a controller class for Posts.
     * @param postController controller class for Posts
     */
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
            this.postController.createPost(request, response);
        });

        router.get('/', (request: Request, response: Response) => {
            this.postController.getAllPosts(request, response);
        });
    }
}
