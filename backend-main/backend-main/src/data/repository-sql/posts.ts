import { PostInterface } from '../../business/models/posts';
import { PostRepositoryInterface } from '../models/post-interface';
import { Database } from '../../util/database';
import { RowDataPacket } from 'mysql2';

export class SQLPostRepository implements PostRepositoryInterface {
    public constructor(private database: Database) {}

    /**
     * @author Madelief van Slooten
     * Takes a RowDataPacket post and turns it into a PostInterface valid object.
     * @param post RowDataPacket of a post object.
     * @returns a post as a PostInterface valid object.
     */
    private formatPost(post: RowDataPacket): PostInterface {
        const { id, userId, title, description, areaOfExpertise, likes, sdgId, user } = post as PostInterface;
        return {
            id,
            userId,
            title,
            description,
            areaOfExpertise,
            likes,
            sdgId,
            user,
        };
    }

    /**
     * @author Madelief van Slooten
     * Finds all posts as a RowDataPacket[] and uses the formatPost function to return the posts in the right format.
     * @returns a Promise of a post array
     */
    public async findAll(): Promise<PostInterface[]> {
        try {
            return (
                (
                    await this.database
                        .pool!.promise()
                        .query(
                            'SELECT * FROM sql_sdg_databasedetectives.post INNER JOIN sql_sdg_databasedetectives.user ON user.id = post.userId'
                        )
                )[0] as RowDataPacket[]
            ).map(post => this.formatPost(post)); //TODO: Posts worden nu goed opgehaald, alleen de user blijft undefined, moet gefixed worden.
        } catch (error: unknown) {
            throw new Error('Failed to find posts');
        }
    }
    /**
     * @author Madelief van Slooten
     * Creates a post with a user relationship.
     * @param post Post object
     * @returns boolean if post is created or not.
     */
    public async create(post: PostInterface): Promise<boolean> {
        try {
            this.database.pool?.query(
                'INSERT INTO sql_sdg_databasedetectives.post (userId, title, description, sdgId, areaOfExpertise) VALUES (?, ?, ?, ?, ?)',
                [post.userId, post.title, post.description, post.sdgId, post.areaOfExpertise],
                function (err, result) {
                    if (err) {
                        throw new Error('Failed to create post');
                    }
                }
            );
            return true;
        } catch (error: unknown) {
            throw new Error('Failed to create post');
        }
    }
}
