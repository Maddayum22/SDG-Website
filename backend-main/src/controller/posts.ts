import { PostService } from "../services/posts";
import { Request, Response } from "express";

export class PostController {
  public constructor(private postService: PostService) {}

  /**
   * @author Madelief van Slooten
   * Controls a request for a post. Calls on service to check if post is correct format. If so, continues from there.
   * @param request request
   * @param response response
   */
  public async create(request: Request, response: Response) {
    try {
      await this.postService.create(request.body);
      response.status(200).json("Post created");
    } catch (err) {
      response.status(400).end("Post not created");
    }
  }

  /**
   * @author Madelief van Slooten
   * Controls a request for getting all posts.
   * @param request request
   * @param response response
   */
  public async findAll(request: Request, response: Response) {
    try {
      const returnValue = await this.postService.findAll();
      if (returnValue.length === 0) {
        response.status(204).json("No posts yet!");
      } else {
        response.status(200).json(returnValue);
      }
    } catch (error) {
      response.status(400).end("Something went wrong");
    }
  }
}
