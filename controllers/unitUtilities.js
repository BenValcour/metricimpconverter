const unitInputConversionMap = new Map([
    ['mi', 'miles'],
    ['km', 'kilometers'],
    ['lbs', 'pounds'],
    ['kg', 'kilograms'],
    ['gal', 'gallons'],
    ['l', 'liters']
]);

// the accepted units...
// we have this silliness as one wants support for "L" for litres.
const initUnits = new Map([
    ['mi', 'mi'],
    ['km', 'km'],
    ['lbs', 'lbs'],
    ['kg', 'kg'],
    ['gal', 'gal'],
    ['l', 'L']
]);

const conversionTable = new Map([
    [ 'mi', {"returnUnit": "km", "multiplier": 1.60934}],
    [ 'km', {"returnUnit": "mi", "multiplier": 1 / 1.60934}],
    [ 'gal', {"returnUnit": "L", "multiplier": 3.78541}],
    [ 'L', {"returnUnit": "gal", "multiplier": 1 / 3.78541}],
    [ 'lbs', {"returnUnit": "kg", "multiplier": 0.453592}],
    [ 'kg', {"returnUnit": "lbs", "multiplier": 1 / 0.453592}]
]);

function getConversionFormula(unit) {
    if (checkForValidUnit(unit)) {
        return conversionTable.get(unit);
    }
    throw Error(`Invalid unit: ${unit}`);
}

function checkForValidUnit(unit) {

    //console.log(`checkForValidUnit:: unit: ${unit} is of type ${typeof(unit)}`);

    if ( unitInputConversionMap.has(unit.toLowerCase()) ) {
        return true;
    }
    else {
        return false;
    }
}

function getCanonicalUnitName(unit) {
    if (checkForValidUnit(unit)) {
        return initUnits.get(unit.toLowerCase());
    }
    else {
        throw Error("invalid unit");
    }
}

function getFullUnitName(unit) {

   let result = '';

    if ( checkForValidUnit(unit.toLowerCase()) ) {
        result = unitInputConversionMap.get(unit.toLowerCase());
        return result;
    }
    throw Error('invalid unit');

}

module.exports.checkForValidUnit = checkForValidUnit;
module.exports.getFullUnitName = getFullUnitName;
module.exports.getConversionFormula = getConversionFormula;
module.exports.getCanonicalUnitName = getCanonicalUnitName;