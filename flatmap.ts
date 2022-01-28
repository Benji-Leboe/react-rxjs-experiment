const arr = [82, 48, 80, 12];

const doubles = arr.flatMap(num => [num, num]);

const identity = arr.flatMap(num => [num]);

console.log('Identity', identity);

const mapped = arr.flatMap(num => [num * 2]);

console.log('Mapped', mapped);

const empty = arr.flatMap(num => []);

console.log('Empty', empty);

const filtered = arr.flatMap(num => num < 50 ? [] : [num]);

console.log('Filtered', filtered);

const filterMap = arr.flatMap(num => num < 50 ? [num * 2] : []);

console.log('FilterMap', filterMap);