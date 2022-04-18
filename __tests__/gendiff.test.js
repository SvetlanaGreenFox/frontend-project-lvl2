import { test, expect } from '@jest/globals';
import genDiff from '../src/utils';
import getFixturePath from '../src/getFixturePathFile';

test('gendiffTest', () => {
  const pathToFile1 = getFixturePath('file1.json');
  const pathToFile2 = getFixturePath('file2.json');
  const pathToFile3 = getFixturePath('file3.yaml');
  const pathToFile4 = getFixturePath('file4.yml');

  const data = [
    '  - follow: false',
    '  host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
  ];

  const expected = ['{', ...data, '}'].join('\n');

  expect(genDiff(pathToFile1, pathToFile2)).toBe(expected);
  expect(genDiff(pathToFile3, pathToFile4)).toBe(expected);
});
