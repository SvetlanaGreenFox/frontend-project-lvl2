import { program } from 'commander';
import genDiff from './utils.js';

const getDiff = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-v, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2));
    });

  program.parse(process.argv);
};

export default getDiff;
