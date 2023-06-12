import { PostBusiness, PostInterface } from '../../business/models/posts';
import { PostRepositoryInterface } from '../models/post-interface';
import { Database } from '../../util/database';
import { UserBusiness, UserInterface } from '../../business/models/users';

export class SQLPostRepository implements PostRepositoryInterface {
    /**
     * @author Madelief van Slooten
     * Posts repository class that uses a database connection chosen in the server configuration.
     * @param database - Chosen database connection
     */
    public constructor(private database: Database) {}

    /**
     * @author Madelief van Slooten
     * formats the post by validating the post in the Business layer,
     * then makes sure the right info is added so it is the correct format.
     * @param post Post object
     * @returns a PostInterface valid post object.
     */
    private formatPost(post: any): PostInterface {
        let businessPost: PostInterface = new PostBusiness.Post(post);
        let user: UserInterface = new UserBusiness.User({
            username: post.username,
            password: post.password,
            emailAdress: post.emailAdress,
            areaOfExpertise: post.areaOfExpertise,
            userType: post.userType,
        });
        businessPost.user = user;
        businessPost.createdAt = post.createdAt;
        businessPost.updatedAt = post.updatedAt;

        return businessPost;
    }

    /**
     * @author Madelief van Slooten
     * Retrieves all posts from the database and formats them using the formatPost function.
     * @returns Promise<PostInterface[]> - An array of posts
     */
    public async getAllPosts(): Promise<PostInterface[]> {
        let allPosts: PostInterface[] = [];
        try {
            const [rows] = await this.database
                .pool!.promise()
                .query(
                    'SELECT * FROM sql_sdg_databasedetectives.post INNER JOIN sql_sdg_databasedetectives.users ON users.id = post.userId ORDER BY createdAt DESC'
                );
            const posts = rows;
            posts.forEach((post: any) => {
                let businessPost = this.formatPost(post);
                allPosts.push(businessPost);
            });
        } catch (error: unknown) {
            console.log(error);
            throw new Error('Failed to find posts');
        }
        return allPosts;
    }
    /**
     * @author Madelief van Slooten
     * Creates a post with a user relationship.
     * @param post - Post object to be created
     * @returns Promise<boolean> - Indicates whether the post was created successfully or not
     */
    public async createPost(post: PostInterface): Promise<boolean> {
        try {
            this.database.pool?.query(
                'INSERT INTO sql_sdg_databasedetectives.post (userId, title, description, sdgId, areaOfExpertise, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [post.userId, post.title, post.description, post.sdgId, post.areaOfExpertise, new Date(), new Date()]
            );
            return true;
        } catch (error: unknown) {
            throw new Error('Failed to create post');
        }
    }
}
