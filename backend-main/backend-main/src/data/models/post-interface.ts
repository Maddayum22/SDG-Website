import { PostBusiness, PostInterface } from '../../business/models/posts';

export interface PostRepositoryInterface {
    create(post: PostInterface): Promise<boolean>;
    findAll(): Promise<PostInterface[]>;
}
