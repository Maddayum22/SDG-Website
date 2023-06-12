import { AreaOfExpertise } from '../../data/models/types';
import { UserInterface } from './users';

/** @author Madelief van Slooten */
export interface PostInterface {
    id?: number;
    userId: number;
    title: string;
    description: string;
    image?: string;
    likes?: number;
    sdgId: number;
    areaOfExpertise: AreaOfExpertise;
    createdAt?: string;
    updatedAt?: string;
    user?: UserInterface;
}

/**
 * @author Madelief van Slooten
 */
export namespace PostBusiness {
    export class Post implements PostInterface {
        userId!: number;
        title!: string;
        description!: string;
        sdgId!: number;
        areaOfExpertise!: AreaOfExpertise;

        /**
         * @author Madelief van Slooten
         * Creates a new Post instance.
         * @param post The post object containing the necessary data.
         * @throws Error if the post data is invalid.
         */
        public constructor(post: PostInterface) {
            if (!this.validatePostData(post.title, post.description)) {
                throw new Error('Invalid post data');
            }

            this.userId = post.userId;
            this.title = post.title;
            this.description = post.description;
            this.sdgId = post.sdgId;
            this.areaOfExpertise = post.areaOfExpertise;
        }

        /**
         * @author Madelief van Slooten
         * Validates the post data by checking the length constraints.
         * @param title The post title.
         * @param description The post description.
         * @returns boolean indicating if the post data is valid.
         */
        private validatePostData(title: string, description: string): boolean {
            return title.length <= 100 && title.length > 0 && description.length <= 300 && description.length > 0;
        }
    }
}
