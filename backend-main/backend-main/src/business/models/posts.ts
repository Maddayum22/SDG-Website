import { AreaOfExpertise } from '../../data/models/types';
import { User } from '../../data/models/users';

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
    user?: User;
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

        public constructor(post: PostInterface) {
            if (!this.validatePost(post.title, post.description)) {
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
         * Checks to see if the items are the correct length.
         * @param title post title
         * @param description post description
         * @returns boolean
         */
        private validatePost(title: string, description: string): boolean {
            return title.length <= 100 && title.length > 0 && description.length <= 300 && description.length > 0;
        }
    }
}
