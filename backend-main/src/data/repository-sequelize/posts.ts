import { PostBusiness, PostInterface } from '../../business/models/posts';

import { PostRepositoryInterface } from '../models/post-interface';
import { Post } from '../models/posts';
import { User } from '../models/users';

export class PostRepository implements PostRepositoryInterface {
    public constructor() {}

    /**
     * @author Madelief van Slooten
     * Creates a post with a user relationship.
     * @param post Post object
     * @returns boolean if post is created or not.
     */
    public async create(post: PostInterface): Promise<boolean> {
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
     * Gets all posts from database.
     * @returns Post[] array of posts
     */
    public async findAll(): Promise<PostInterface[]> {
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
     * formats the post by validating the post in the Business layer, 
     * then makes sure the right info is added so it is the correct format.
     * @param post Post object
     * @returns a PostInterface valid post object.
     */
    private formatPost(post: Post): PostInterface {
        let businessPost: PostInterface = new PostBusiness.Post(post);
        businessPost.user = post.user;
        businessPost.createdAt = post.createdAt;
        businessPost.updatedAt = post.updatedAt;

        return businessPost;
    }
}
