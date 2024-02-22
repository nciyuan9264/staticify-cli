// import a from './index';
import minimist from 'minimist';
module.exports = function entry(cwd = process.cwd(), args) {
  args = args || minimist(process.argv.slice(2), { string: ['_', 'p', 'path', 's', 'slug'] });
  console.log('赶紧开发！');
}