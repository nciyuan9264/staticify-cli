"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = entry;
var _minimist = _interopRequireDefault(require("minimist"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import a from './index';

function entry() {
  var cwd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var args = arguments.length > 1 ? arguments[1] : undefined;
  args = args || (0, _minimist["default"])(process.argv.slice(2), {
    string: ['_', 'p', 'path', 's', 'slug']
  });
  console.log('赶紧开发！');
}