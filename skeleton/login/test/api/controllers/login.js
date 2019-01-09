var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {
    describe('login', function() {
        describe('POST /login', function() {
            it('should return a token string if properly authenticated', function(done) {
                request(server)
                    .post('/login')
                    .send({ username: 'mockuser', password: 'mockpassword' })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        should.exist(res.body.access_token);
                        done();
                    });
            });
            it('should return a 401 with wrong credentials', function(done) {
                request(server)
                    .post('/login')
                    .send({ username: 'wrong', password: 'wrong' })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .end(function(err, res) {
                        should.not.exist(err);
                        done();
                    });
            });
            it('should return a 400 with wrong parameters', function(done) {
                request(server)
                    .post('/login')
                    .send({ user: 'wrong', password: 'wrong' })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .end(function(err, res) {
                        should.not.exist(err);
                        done();
                    });
            });
        });
    });
});
