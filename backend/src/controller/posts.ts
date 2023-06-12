import { PostService } from '../services/posts';
import { Request, Response } from 'express';

export class PostController {
    /**
     * @author Madelief van Slooten
     * Controller class that handles post-related requests using the PostService class.
     * @param postService The service class for posts.
     */
    public constructor(private postService: PostService) {}

    /**
     * @author Madelief van Slooten
     * Handles a request to create a post. Calls the service to check if the post is in the correct format.
     * If valid, the post is created; otherwise, an appropriate response is sent.
     * @param request The request object.
     * @param response The response object.
     */
    public async createPost(request: Request, response: Response): Promise<void> {
        try {
            const isPostSuccesfullyCreated = await this.postService.createPost(request.body);
            if (isPostSuccesfullyCreated) {
                response.status(201).json('Post created');
            } else {
                response.status(406).json('Invalid post');
            }
        } catch (err) {
            response.status(500).json('Someting went wrong');
        }
    }

    /**
     * @author Madelief van Slooten
     * Controls a request for retrieving all posts.
     * @param _request The request object.
     * @param response The response object.
     */
    public async getAllPosts(_request: Request, response: Response): Promise<void> {
        try {
            const allPosts = await this.postService.getAllPosts();
            if (allPosts?.length === 0) {
                response.status(204).json('No posts found');
            } else {
                response.status(200).json(allPosts);
            }
        } catch (err) {
            response.status(500).json('Something went wrong');
        }
    }
}
