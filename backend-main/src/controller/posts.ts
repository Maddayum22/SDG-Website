import { PostService } from '../services/posts';
import { Request, Response } from 'express';

export class PostController {
    /**
     * @author Madelief van Slooten
     * Controller class that uses the post Service class
     * @param sessionService Service class for sessions
     */
    public constructor(private postService: PostService) {}

    /**
     * @author Madelief van Slooten
     * Controls a request for a post. Calls on service to check if post is correct format. If so, continues from there.
     * @param request request
     * @param response response
     */
    public async create(request: Request, response: Response): Promise<void> {
        try {
            (await this.postService.create(request.body))
                ? response.status(201).json('Post created')
                : response.status(406).json('Post was not Valid');
        } catch (err) {
            response.status(500).json('Someting went wrong');
        }
    }

    /**
     * @author Madelief van Slooten
     * Controls a request for getting all posts.
     * @param request request
     * @param response response
     */
    public async findAll(_request: Request, response: Response): Promise<void> {
        try {
            const posts = await this.postService.findAll();
            posts?.length === 0 ? response.status(204).json('No posts yet!') : response.status(200).json(posts);
        } catch (err) {
            response.status(500).json('Something went wrong');
        }
    }
}
