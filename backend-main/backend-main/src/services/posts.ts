import { PostRepositoryInterface } from '../data/models/post-interface';
import { PostBusiness, PostInterface } from '../business/models/posts';

export class PostService {
    public constructor(private postRepository: PostRepositoryInterface) {}

    /**
     * @author Madelief van Slooten
     * Creates a Post from the post body, if the post is valid it sends the post to the repository layer.
     * @param post Post object
     * @returns boolean if post is right format
     */
    public async create(post: PostInterface): Promise<boolean> {
        let validatedPost = new PostBusiness.Post(post);

        if (!validatedPost) {
            throw new Error('Invalid Post Data');
        }

        try {
            return await this.postRepository.create(validatedPost);
        } catch (err: unknown) {
            throw new Error('Failed to create post');
        }
    }

    /**
     * @author Madelief van Slooten
     * Calls repository to get all posts, if there are no posts, a message telling so gets returned.
     * @returns Post[] Array of posts.
     */
    public async findAll(): Promise<PostInterface[]> {
        try {
            return await this.postRepository.findAll();
        } catch (error) {
            throw new Error('Failed to find posts');
        }
    }
}
