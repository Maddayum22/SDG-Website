import { PostBusiness, PostInterface } from '../../business/models/posts';
import { PostRepositoryInterface } from '../models/post-interface';
import { Post } from '../models/posts';
import { User } from '../models/users';

export class PostRepository implements PostRepositoryInterface {
    public constructor() {}

    /**
     * @author Madelief van Slooten
     * Creates a new post with a user relationship.
     * @param post - Post object to be created
     * @returns boolean - Indicates whether the post was created successfully or not
     * @throws Error if the creating fails.
     */
    public async createPost(post: PostInterface): Promise<boolean> {
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
            return true;
        } catch (error: unknown) {
            throw new Error('Failed to create post');
        }
    }

    /**
     * @author Madelief van Slooten & Rowen Zaal
     * Retrieves all posts from database.
     * @returns Post[] array of posts
     * @throws Error if the retrieval fails.
     */
    public async getAllPosts(): Promise<PostInterface[]> {
        let allPosts: PostInterface[] = [];
        try {
            let posts = await Post.findAll({
                order: [['createdAt', 'DESC']],
                include: [User],
            });
            posts.forEach(post => {
                let businessPost = this.formatPost(post);
                allPosts.push(businessPost);
            });
        } catch (error) {
            throw new Error('Failed to find posts');
        }
        return allPosts;
    }

    /**
     * @author Madelief van Slooten
     * Formats a post by validating it in the business layer and adding necessary information.
     * @param post - Post object to be formatted
     * @returns PostInterface - A valid formatted post object
     */
    private formatPost(post: Post): PostInterface {
        let businessPost: PostInterface = new PostBusiness.Post(post);
        businessPost.user = post.user;
        businessPost.createdAt = post.createdAt;
        businessPost.updatedAt = post.updatedAt;

        return businessPost;
    }
}
