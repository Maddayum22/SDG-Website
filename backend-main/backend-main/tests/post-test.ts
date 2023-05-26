import chai, { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import * as tssinon from 'ts-sinon';
import * as Sinon from 'sinon';
import { PostBusiness } from '../src/business/models/posts';
import { PostTestHelper } from './post-test-helper';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

describe('postBusiness unit tests', () => {
    let postHelper = new PostTestHelper();
    let postBusiness: PostBusiness.Post;

    it('creates a Post object if the input values are valid', () => {
        postBusiness = new PostBusiness.Post(postHelper.fakePostData());
        const expectedValue = postHelper.fakePostData();

        expect(postBusiness).to.deep.equal(expectedValue);
    });

    it('doest not create a Post object if the input values are not valid', () => {
        expect(() => {
            postBusiness = new PostBusiness.Post(postHelper.fakePostDataIncorrect());
        }).to.throw('Invalid post data');
    });
});

/**
 * @author Madelief van Slooten
 * Post Service unit tests.
 */
describe('Post Service integration tests', () => {
    const sandbox: Sinon.SinonSandbox = tssinon.default.createSandbox();
    const postHelper = new PostTestHelper();
    const postService = postHelper.getPostService();
    const postData = postHelper.fakePostData();

    afterEach(() => {
        sandbox.restore();
        tssinon.default.restore();
    });

    it('should check and create a post and return true if succeeded', async () => {
        const result = await postService!.create(postData);
        expect(result).to.be.true;
    });

    it('should throw error if post was not correct', async () => {
        await expect(postService.create(postHelper.fakePostDataIncorrect())).to.be.rejectedWith(
            Error,
            'Invalid post data'
        );
    });

    it('finds all posts and returns an array', async () => {
        const result = await postService!.findAll();
        expect(result).to.deep.equal([postData, postData]);
    });
});
