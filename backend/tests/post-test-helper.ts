import { PostInterface } from '../src/business/models/posts';
import { PostRepositoryInterface } from '../src/data/models/post-interface';
import { AreaOfExpertise } from '../src/data/models/types';
import { PostService } from '../src/services/posts';
import { PostController } from '../src/controller/posts';

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

    /**
     * @author Madelief van Slooten
     * @returns PostController using a stub of the post service
     */
    public getPostController(): PostController {
        const postService: PostService = new PostServiceStub(new PostRepositoryStub());
        const postController: PostController = new PostController(postService);
        return postController;
    }
}

/**
 * @author Madelief van Slooten
 * Stub of the postrepository. This was made to make stubbing easier for the integration tests of both the service and the controller.
 */
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

    createPost(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        });
    }
    getAllPosts(): Promise<PostInterface[]> {
        return new Promise<PostInterface[]>(res => {
            res([this.fakePostData(), this.fakePostData()]);
        });
    }
}

/**
 * @author Madelief van Slooten
 * Stub of the postservice. This was made to make stubbing easier for the integration tests of the controller.
 */
export class PostServiceStub extends PostService {
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

    createPost(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        });
    }

    getAllPosts(): Promise<PostInterface[]> {
        return new Promise<PostInterface[]>(res => {
            res([this.fakePostData(), this.fakePostData()]);
        });
    }
}
