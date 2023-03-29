const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

//convertHandler should correctly read a whole number input. 
    test( "convertHandler should correctly read a whole number input.", () => {
        assert.equal(convertHandler.getNum("3kg"), 3);
    });

//convertHandler should correctly read a decimal number input.
    test("convertHandler should correctly read a decimal number input.", () => {
        assert.equal(convertHandler.getNum("1.1mi"), 1.1);
    });

//convertHandler should correctly read a fractional input.
    test("convertHandler should correctly read a fractional input.", () => {
        assert.equal(convertHandler.getNum("1/2lbs"),0.5);
    });

//convertHandler should correctly read a fractional input with a decimal.
    test("convertHandler should correctly read a fractional input with a decimal.", () => {
        assert.equal(convertHandler.getNum("3/1.5mi"), 2);
    });

//convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", ()=> {
        assert.throws(() => convertHandler.getNum("1/1/1"), Error );
    });
//convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
        assert.equal(convertHandler.getNum("mi"),1);
    });

//convertHandler should correctly read each valid input unit.

    suite("convertHandler should correctly read each valid input unit.", ()=> {
    
        const validUnits = ['mi','km','lbs','kg','gal', 'l','MI', 'Gal', 'L'];

        validUnits.forEach((unit) => {
            test(`convertHandler should correctly read each valid input [${unit}].`, () =>  {
                assert.equal(convertHandler.getUnit(unit), unit);
            });
        });
        
    });

// convertHandler should correctly return an error for an invalid input unit.
    suite("convertHandler should correctly return an error for an invalid input unit.", () => {
        const invalidUnits = ['mile','foo','gallon','foot','xmi']
        invalidUnits.forEach((unit) => {
            test(`convertHandler should correctly return an error for an invalid input ${unit}`, () => {
                assert.throws( (unit) => {
                    convertHandler.getUnit(unit);
                });
            });
        });
    });

    suite("convertHandler should return the correct return unit for each valid input unit", () => {
        const units = [
            {'input': 'mi', 'initUnit': 'mi'},
            {'input': 'L', 'initUnit': 'L'},
            {'input': 'l', 'initUnit': 'L'}
        ];
        units.forEach(({input, initUnit})=> {
            
            test(`convertHandler should return the correct initUnit ${initUnit} for each valid input ${input}`, () => {
                assert.equal(convertHandler.getReturnUnit(input),initUnit);
            });
        });
    });

// convertHandler should correctly return the spelled-out string unit for each valid input unit.
    suite("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {

        const spelledOutUnits = [
            {'input': 'mi', 'spelledOutName': 'miles'},
            {'input': 'km', 'spelledOutName': 'kilometers'},
            {'input': 'lbs', 'spelledOutName': 'pounds'},
            {'input': 'kg', 'spelledOutName': 'kilograms'},
            {'input': 'gal', 'spelledOutName': 'gallons'},
            {'input': 'l', 'spelledOutName': 'liters'}
        ];

        spelledOutUnits.forEach( ({input, spelledOutName}) => {
            test(`input unit ${input} should return spelled out string  unit ${spelledOutName}`, () => {
                assert.equal(convertHandler.spellOutUnit(input), spelledOutName);
            });
        });

    });

// const galToL = 3.78541;
// const lbsToKg = 0.453592;
// const miToKm = 1.60934;
   
    const convertThings = [
        {"initNum" : 1, "initUnit": "mi", "returnNum": 1.60934, "returnUnit": "km"},
        {"initNum" : 1, "initUnit": "km", "returnNum": (1 / 1.60934).toFixed(5), "returnUnit": "mi"},
        {"initNum" : 1, "initUnit": "lbs", "returnNum": 0.45359, "returnUnit": "kg"},
        {"initNum" : 1, "initUnit": "kg", "returnNum": (1 / 0.453592).toFixed(5), "returnUnit": "lbs"},
        {"initNum" : 1, "initUnit": "gal", "returnNum": 3.78541, "returnUnit": "L"},
        {"initNum" : 1, "initUnit": "L", "returnNum": (1 / 3.78541).toFixed(5), "returnUnit": "gal"}
    ];

    suite(`convertHandler should correctly convert units.`, () => {
        convertThings.forEach(({initNum, initUnit, returnNum,returnUnit}) => {

            test(`convertHandler should correctly convert ${initUnit} to ${returnUnit}`, (done) => {
                let result = convertHandler.convert(initNum,initUnit);
                assert.equal(result.returnNum, returnNum);
                assert.equal(result.returnUnit, returnUnit);
                done();
            });
        });
    });
 
});