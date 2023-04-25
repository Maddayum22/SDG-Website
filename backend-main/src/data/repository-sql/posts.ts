import { PostBusiness } from "../../business/models/posts";
import { PostRepositoryInterface } from "../models/post-interface";
import { Post } from "../models/posts";
import { Database } from "../../util/database";

export class SQLPostRepository implements PostRepositoryInterface {
  public constructor(private database: Database) {}

  public async findAll(): Promise<PostBusiness.Post[]> {
    return [];
  }
  /**
   *  @author Madelief van Slooten
   * Creates a post with a user relationship.
   * @param post Post object
   * @returns boolean if post is created or not.
   */
  public async create(post: Post): Promise<boolean> {
    let postCreated: boolean = false;

    try {
      this.database.pool?.query(
        "INSERT INTO sql_sdg_databasedetectives.post (userId, title, description, SDGid, areaOfExpertise) VALUES (?, ?, ?, ?, ?)",
        [
          post.userId,
          post.title,
          post.description,
          post.sdgId,
          post.areaOfExpertise,
        ],
        function (err, result) {
          if (err) {
            console.log(err);
            postCreated = true;
          }
        }
      );
    } catch (error: unknown) {
      console.log(error);
    }
    return postCreated;
  }
}
