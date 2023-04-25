import { PostBusiness } from "../../business/models/posts";
/**
 *  @author Madelief van Slooten
 */
export interface PostRepositoryInterface {
  create(post: PostBusiness.Post): Promise<boolean>;
  findAll(): Promise<PostBusiness.Post[]>;
}
