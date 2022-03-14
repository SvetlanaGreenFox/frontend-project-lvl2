import genDiff from '../src/utils';
// import fs from 'fs';

test('test', () => {
  const a = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const b = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  const expected = '{ - follow: false  host: hexlet.io - proxy: 123.234.53.22 - timeout: 50 + timeout: 20 + verbose: true }';

  expect(genDiff(a, b)).toBe(expected);
});
