const {getConversionFormula, checkForValidUnit, getFullUnitName, getCanonicalUnitName}= require('./unitUtilities.js');

function ConvertHandler() {
  
  this.verifyInputs = function(input) {

    let isValidNumber = this.verifyNumber(input);
    let isValidUnit = this.verifyUnit(input);

    if (isValidNumber && !isValidUnit) {
      throw Error('invalid unit');
    }

    
    if (isValidUnit && !isValidNumber) {
      throw Error('invalid number');
    }

    
    if (!isValidNumber && !isValidUnit) {
      throw Error('invalid number and unit');
    }
  }

  // verifyNumber - return true if the number is valid, otherwise false
  this.verifyNumber = function(input) {
    let number = input.match(/[0-9\.\/]+/);

    // no number defaults to 1, so its valid.
    if (number === null) {
      return true;
    }

    // should only be one number.
    if (number.length > 1) {
      return false;
    }

    // check for invalid a fraction. ie: more than one '/'
    if ( /\//.test(number) ) {
      let fraction = `${number}`.split("/");
      if (fraction.length !== 2) {
        return false;
      }
    } 

    // got this far, must be valid.
    return true;
  }

  // verifyUnit - return true if the unit is a valid unit, ot
  this.verifyUnit = function(input) {

    let result = true;

    try {
      let unit = this.getUnit(input);
    }
    catch (error) {
      result = false;
    }

    return result;

  }

  this.getNum = function(input) {
    let result;

    let number = input.match(/[0-9\.\/]+/);

    // default to 1 if no number is specified.
    if (number === null) {
      number = 1;
    } 
    else {
      number = number[0];
    }

    // check for a fraction
    if ( /\//.test(number) ) {
      let fraction = `${number}`.split("/");
      // do not support double fractions
      if (fraction.length !== 2) {
        throw new Error("invalid number");
      } 
      result = fraction[0] / fraction[1];  
    }
    else {
      result = parseFloat(number);
    }

    return result;
  };
  
  this.getUnit = function(input) {

    let result = input.match(/[^0-9\.\/]+/);

    if ( result === null) {
      throw Error('invalid unit');
    }

    result = result[0];

    if (checkForValidUnit(result)) {
      return result;
    } 
    else {
      throw Error('invalid unit');
    }    
  };
  
  this.getReturnUnit = function(unit) {
    return getCanonicalUnitName(unit);
  };

  this.spellOutUnit = function(unit) {
    let result;

    if (checkForValidUnit(unit)) {
      return getFullUnitName(unit);
    }
    throw Error('invalid unit');
  };
  
  this.convert = function(initNum, initUnit) {

    let unit = this.getUnit(initUnit);

    // const galToL = 3.78541;
    // const lbsToKg = 0.453592;
    // const miToKm = 1.60934;

    let formula = getConversionFormula(unit);

  
    let result = {"returnNum": (initNum * formula.multiplier).toFixed(5), "returnUnit": formula.returnUnit};
     
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

  // {"initNum":2,"initUnit":"mi","returnNum":3.21868,"returnUnit":"km","string":"2 miles converts to 3.21868 kilometers"}

    let string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    let result = {
      "initNum": parseFloat(initNum),
      "initUnit": initUnit,
      "returnNum": parseFloat(returnNum),
      "returnUnit": returnUnit,
      "string": string
    };
      
    return result;
  };
  
}

module.exports = ConvertHandler;
