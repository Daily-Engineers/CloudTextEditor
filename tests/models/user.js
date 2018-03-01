const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../../app.js');
const http = require('http');
const User = require('../../models/users');


const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);
const agent = chai.request.agent(app)

describe('/register', function() {
    it('Should request to create a user in the database', function(){
        chai.request(app).post('/register').send({username: 'TestCase', password: 'password'}).end(function(err, res){
            expect(res).to.have.status(200);
            done();
        })
    })
});


//TODO fix this. 'it' assert is called before the data base returns resalts
describe('dB.user',function(){
    it('Should see to see if the user exists in the database',async function(){
        var user = await User.findOne({'username': 'testcase'}).exec(function(err, user){
            if(user){
                console.log("eefef")
                done()
            }
        })
    })
});

//also doesnt check and just asserts
describe('/login', function() {
    it('Should request to create a user in the database', function(){
        agent.post('/login').send({username: 'TestCase', password: 'password'}).then(function(res){
            return agent.get('/login').then(function(res){

            })
        })
    })
});
