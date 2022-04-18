import _ from 'lodash';
import * as path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';

const prepareData = (file) => readFileSync(path.resolve(file));

const getData = (file) => {
  const readyData = prepareData(file);
  const parseMethod = parse(file);

  return parseMethod(readyData);
};

const genDiff = (file1, file2) => {
  const file1Data = getData(file1);
  const file2Data = getData(file2);

  const keysFile1 = Object.keys(file1Data);
  const keysFile2 = Object.keys(file2Data);
  const uniqKeys = _.union([...keysFile1, ...keysFile2]).sort();

  const result = [];

  for (let i = 0; i <= uniqKeys.length; i += 1) {
    const elem = uniqKeys[i];

    if (Object.hasOwn(file1Data, elem) && !Object.hasOwn(file2Data, elem)) {
      result.push(`  - ${elem}: ${file1Data[elem]}`);
    } else if (!Object.hasOwn(file1Data, elem) && Object.hasOwn(file2Data, elem)) {
      result.push(`  + ${elem}: ${file2Data[elem]}`);
    } else if (Object.hasOwn(file1Data, elem) && Object.hasOwn(file2Data, elem)) {
      if (file1Data[elem] === file2Data[elem]) {
        result.push(`  ${elem}: ${file1Data[elem]}`);
      } else {
        result.push(`  - ${elem}: ${file1Data[elem]}`);
        result.push(`  + ${elem}: ${file2Data[elem]}`);
      }
    }
  }

  return ['{', ...result, '}'].join('\n');
};

export default genDiff;
