const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    const inputs = [
        {
            "testtype" : "a valid input",
            "input": "10L", 
            "result": '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}'
        },
        {
            "testtype" : "an invalid unit",
            "input": "32g", 
            "result": "invalid unit"
        },
        {
            "testtype" : "an invalid number",
            "input": "3/7.2/4kg", 
            "result": "invalid number"
        },
        {
            "testtype" : "an invalid number and unit",
            "input": "3/7.2/4kilomegagram", 
            "result": "invalid number and unit"
        },
        {
            "testtype" : "with no number",
            "input": "mi", 
            "result": '{"initNum":1,"initUnit":"mi","returnNum":1.60934,"returnUnit":"km","string":"1 miles converts to 1.60934 kilometers"}'
        }
    ];

    inputs.forEach(({testtype,input,result}) => {
        test(`Convert ${testtype}  such as ${input}: GET request to /api/convert.`, (done) => {
            chai
                .request(server)
                .get('/api/convert?input=' + input)
                .end(function (err,response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.text, result );
                    done();
                });

        });
    });
   
});


