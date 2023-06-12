import { PostInterface } from '../../business/models/posts';

export interface PostRepositoryInterface {
    createPost(post: PostInterface): Promise<boolean>;
    getAllPosts(): Promise<PostInterface[]>;
}
