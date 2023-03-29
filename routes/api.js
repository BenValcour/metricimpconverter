'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (request,response,next) {
      let input = request.query.input;
      try {
        // this will throw if inputs are bad.
        convertHandler.verifyInputs(input);

        let number =  convertHandler.getNum(input);
      
        let unit = (convertHandler.getUnit(input));
        let initUnit = convertHandler.getReturnUnit(unit);
        let conversion = convertHandler.convert(number,initUnit);
        let responseData = convertHandler.getString(number,initUnit,conversion.returnNum,conversion.returnUnit);
        response.send(responseData);
      }
      catch (error) {
        response.send(error.message);
      }

    });


};
