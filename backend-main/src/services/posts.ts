import { response } from "express";
import { PostRepositoryInterface } from "../data/models/post-interface";
import { PostBusiness } from "../business/models/posts";

export class PostService {
  public constructor(private postRepository: PostRepositoryInterface) {}

  /**
   * @author Madelief van Slooten
   * Checks if post contains the right info.
   * @param post Post object
   * @returns boolean if post is right format
   */
  public async create(post: PostBusiness.Post): Promise<boolean> {
    let postIsCorrectFormat: boolean = false;
    try {
      if (
        this.checkLength(100, post.title) &&
        this.checkLength(300, post.description) &&
        (post.sdgId !== null || undefined) &&
        (post.areaOfExpertise !== null || undefined)
      ) {
        postIsCorrectFormat = await this.postRepository.create(post);
      }
    } catch (err) {
      response.status(406);
    }
    return postIsCorrectFormat;
  }

  /**
   * @author Madelief van Slooten
   * Calls repository to get all posts, if there are no posts, a message telling so gets returned.
   * @returns Post[] Array of posts.
   */
  public async findAll(): Promise<PostBusiness.Post[]> {
    let returnValue: PostBusiness.Post[] = [];
    try {
      returnValue = await this.postRepository.findAll();
    } catch (error) {
      response.status(400).json("error");
    }
    return returnValue;
  }

  /**
   * @author Madelief van Slooten
   * Checks length of string by given maxLength.
   * @param maxLength
   * @param string
   * @returns boolean
   */
  private checkLength(maxLength: number, string: string) {
    return string.length <= maxLength && string.length > 0;
  }
}
