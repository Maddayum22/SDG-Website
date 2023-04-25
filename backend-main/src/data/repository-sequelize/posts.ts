import { response } from "express";
import { PostBusiness } from "../../business/models/posts";

import { PostRepositoryInterface } from "../models/post-interface";
import { Post } from "../models/posts";
import { User } from "../models/users";

export class PostRepository implements PostRepositoryInterface {
  public constructor() {}

  /**
   *  @author Madelief van Slooten
   * Creates a post with a user relationship.
   * @param post Post object
   * @returns boolean if post is created or not.
   */
  public async create(post: PostBusiness.Post): Promise<boolean> {
    let postCreated: boolean = false;
    try {
      await Post.create(
        {
          title: post.title,
          description: post.description,
          sdgId: post.sdgId,
          areaOfExpertise: post.areaOfExpertise,
          userId: post.userId,
        },
        { include: User }
      );
      postCreated = true;
    } catch (error: unknown) {
      console.log(error);
    }
    return postCreated;
  }

  /**
   * @author Madelief van Slooten & Rowen Zaal
   * Gets all posts from database.
   * @returns Post[] array of posts
   */
  public async findAll(): Promise<PostBusiness.Post[]> {
    let returnValue: PostBusiness.Post[] = [];
    try {
      returnValue = await Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [User],
      });
    } catch (error) {
      response.status(400).json("Something went wrong, posts not found");
    }
    return returnValue;
  }
}
