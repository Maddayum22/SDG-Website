import { PostRepositoryInterface } from '../data/models/post-interface';
import { PostBusiness, PostInterface } from '../business/models/posts';

export class PostService {
    /**
     * @author Madelief van Slooten
     * Initializes a new instance of the PostService class.
     * @param postRepository The repository layer for posts.
     */
    public constructor(private postRepository: PostRepositoryInterface) {}

    /**
     * @author Madelief van Slooten
     * Creates a post from the given post object.
     * If the post is valid, it sends the post to the repository layer for creation.
     * @param post The post object to create.
     * @returns A Promise indicating if the post was created successfully.
     * @throws Error if the post data is invalid or if the creation fails.
     */
    public async createPost(post: PostInterface): Promise<boolean> {
        let validatedPost = new PostBusiness.Post(post);

        if (!validatedPost) {
            throw new Error('Invalid Post Data');
        }

        try {
            return await this.postRepository.createPost(validatedPost);
        } catch (err: unknown) {
            throw new Error('Failed to create post');
        }
    }

    /**
     * @author Madelief van Slooten
     * Retrieves all posts from the repository.
     * If there are no posts, an appropriate message is returned.
     * @returns A Promise with an array of posts.
     * @throws Error if the retrieval fails.
     */
    public async getAllPosts(): Promise<PostInterface[]> {
        try {
            return await this.postRepository.getAllPosts();
        } catch (error) {
            throw new Error('Failed to retrieve posts');
        }
    }
}
