import Sinon from 'sinon';
import { PostInterface } from '../src/business/models/posts';
import { PostRepositoryInterface } from '../src/data/models/post-interface';
import { AreaOfExpertise } from '../src/data/models/types';
import { PostRepository } from '../src/data/repository-sequelize/posts';
import { PostService } from '../src/services/posts';
import * as tssinon from 'ts-sinon';

export class PostTestHelper {
    /**
     * @author Madelief van Slooten
     * @returns Fake post data
     */
    public fakePostData(): PostInterface {
        return {
            userId: 1,
            title: 'Fake Post',
            description: 'Fake Post text data',
            sdgId: 1,
            areaOfExpertise: AreaOfExpertise.Technology,
        };
    }

    /**
     * @author Madelief van Slooten
     * @returns Incorrect fake post data
     */
    public fakePostDataIncorrect(): PostInterface {
        return {
            userId: 1,
            title: '',
            description: 'Fake Post text data',
            sdgId: 1,
            areaOfExpertise: AreaOfExpertise.Technology,
        };
    }

    /**
     * @author Madelief van Slooten
     * @returns PostService using a stub of the post repository
     */
    public getPostService(): PostService {
        const postRepositoryStub: PostRepositoryInterface = new PostRepositoryStub();
        const postService: PostService = new PostService(postRepositoryStub);
        return postService;
    }
}

export class PostRepositoryStub implements PostRepositoryInterface {
    /**
     * @author Madelief van Slooten
     * @returns Fake post data
     */
    public fakePostData(): PostInterface {
        return {
            userId: 1,
            title: 'Fake Post',
            description: 'Fake Post text data',
            sdgId: 1,
            areaOfExpertise: AreaOfExpertise.Technology,
        };
    }

    create(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        });
    }
    findAll(): Promise<PostInterface[]> {
        return new Promise<PostInterface[]>(res => {
            res([this.fakePostData(), this.fakePostData()]);
        });
    }
}
