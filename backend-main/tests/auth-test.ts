/**
 * New Tests written by @author Sven Molenaar
 * These new tests took inspiration from the older tests
 * Original Tests were written by: @author Justin Plein
 */
import chai, { expect } from 'chai';
import { describe, Done, it } from 'mocha';
import { Auth } from '../src/util/auth';
import chaiHttp = require('chai-http');
import * as argon2 from 'argon2';

describe('Authorisation Tests', () => {
    let auth: Auth;

    beforeEach(() => {
        auth = Auth.getInstance();
    });

    describe('Tests to check the implementation of the hashPassword Function', () => {
        it('should hash a given password', (done: Done) => {
            expect(
                auth.hashPassword('Admin123!').then(hash => {
                    expect(hash).to.be.a('string');
                    expect(hash).to.have.length(130);
                    done();
                })
            );
        });
        it('should give each password a unique hash, even if the passwords are the same', (done: Done) => {
            expect(
                auth.hashPassword('Admin123!').then(hash => {
                    auth.hashPassword('Admin123!').then(hash2 => {
                        expect(hash2).to.not.equal(hash);
                        done();
                    });
                })
            );
        });
    });

    describe('Tests to check the implementation of the verifyPassword Function', () => {
        it('can verify a valid password', (done: Done) => {
            const passwordToVerify: string = 'Admin123!';
            auth.hashPassword(passwordToVerify).then((hash: string) => {
                auth.verifyPassword(passwordToVerify, hash).then(result => {
                    expect(result).to.be.true;
                    done();
                });
            });
        });
        it('can reject an invalid password', (done: Done) => {
            const passwordToHash: string = 'WrongPassAdmin123!';
            const actualPassword: string = 'Admin123!';

            auth.hashPassword(passwordToHash).then((hash: string) => {
                auth.verifyPassword(actualPassword, hash).then(result => {
                    expect(result).to.be.false;
                    done();
                });
            });
        });
    });

    describe('Tests to check the implementation of the verifyEmail Function', () => {
        it('should return true if emails match', async () => {
            const emailFromDatabase = 'Admin@Test.com';
            const emailToVerify = 'Admin@Test.com';
            const result = await auth.verifyEmail(emailToVerify, emailFromDatabase);
            expect(result).to.be.true;
        });

        it('should return false if emails do not match', async () => {
            const emailFromDatabase = 'Admin@Test.com';
            const emailToVerify = 'WrongMailAdmin@Test.com';
            const result = await auth.verifyEmail(emailToVerify, emailFromDatabase);
            expect(result).to.be.false;
        });
    });
});
