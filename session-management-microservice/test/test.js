var assert = require('assert');
const addJobData=require('../utility').addJobData
let mongo = require('mongodb').MongoClient
let mongoClient = null
global.mongoDb = null

describe('Database Tests', function() {
    before(function (done) {
        mongo.connect("mongodb://localhost:27017/session-management",
            { useNewUrlParser: true, useUnifiedTopology: true },
            function(err, client){
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
                mongoClient = client
                global.mongoDb = mongoClient.db('session-management')
                done();
		})
    })
	it('add a job ID',function(){
        this.timeout(15000)
        return addJobData({"test":"test"}).then(function(data){
            assert.equal(data['result']['n'],1)
        })
    })
    after(function(done) {
        mongoClient.close()
        done()
      });
})