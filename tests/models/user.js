const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const User = require('../../models/users');

const assert = chai.assert;
const expect = chai.expect;


chai.use(chaiHttp);
const agent = chai.request.agent(app)
    describe('/register', function () {
        it('Should request to create a user in the database', function () {
            chai.request(app).post('/register').send({
                username: 'TestCase',
                password: 'password'
            }).end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            })
        })
    });


    describe('dB.user', function () {
        it('Should see to see if the user exists in the database', async function () {
            var user = await User.findOne({username: 'testcase'})
            assert(user, "User does not exist");
        })
    });

    describe('delete.user', function () {
        it('Should delete the users', async function () {
            var user = await User.remove({username: 'testcase'})
            assert(user.n > 0, "User still exist or no user found");
        })
    })