import * as path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getData = (file) => {
  const pathFile = path.resolve(file);

  return JSON.parse(readFileSync(pathFile));
};

const genDiff = (file1, file2) => {
  const file1Data = getData(file1);
  const file2Data = getData(file2);

  const keysFile1 = Object.keys(file1Data);
  const keysFile2 = Object.keys(file2Data);
  const uniqKeys = _.union([...keysFile1, ...keysFile2]).sort();

  const result = [];

  let length = 0;
  if (keysFile1.length > keysFile2.length) {
    length = keysFile1.length;
  } else if (keysFile1.length < keysFile2.length) {
    length = keysFile2.length;
  } else {
    length = keysFile1.length;
  }

  for (let i = 0; i <= length; i += 1) {
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
