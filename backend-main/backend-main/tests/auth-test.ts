/** @author Justin Plein */

import chai, { expect } from 'chai';
import { describe, Done, it } from 'mocha';
import { Auth } from '../src/util/auth';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('test the authentication functionality', () => {
    const authClass = Auth.getInstance();
    it('can hash a password', (done: Done) => {
        expect(
            authClass.hashPassword('mypassword').then(hash => {
                expect(hash).to.be.a('string');
                expect(hash).to.have.length(130);
                done();
            })
        );
    });

    it('same passwords have different hashes', (done: Done) => {
        expect(
            authClass.hashPassword('mypassword').then(hash => {
                authClass.hashPassword('mypassword').then(hash2 => {
                    expect(hash2).to.not.equal(hash);
                    done();
                });
            })
        );
    });

    it('can verify a valid password', (done: Done) => {
        const passwordToVerify: string = 'mypassword';
        authClass.hashPassword(passwordToVerify).then((hash: string) => {
            authClass.verifyPassword(passwordToVerify, hash).then(result => {
                expect(result).to.be.true;
                done();
            });
        });
    });

    it('can reject an invalid password', (done: Done) => {
        const passwordToHash: string = 'notgood';
        const actualPassword: string = 'mypassword';

        authClass.hashPassword(passwordToHash).then((hash: string) => {
            authClass.verifyPassword(actualPassword, hash).then(result => {
                expect(result).to.be.false;
                done();
            });
        });
    });
});
