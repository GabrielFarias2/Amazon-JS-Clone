import {formatCurrency} from '../javascript/ultility/money.js';

console.log('Test function formatCurrency:')


console.log('convert cents into dollars;')
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('Not pass');
}

console.log('work with 0;')
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('Not pass');
}

console.log('rounds up to the nearest cent;')
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
  console.log('Not pass');
}

console.log('rounds up to the nearest cent -4;')
if (formatCurrency(2000.4) === '20.00') {
    console.log('passed');
} else {
  console.log('Not pass');
}
console.log('END')