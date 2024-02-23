"use strict";

var _minimist = _interopRequireDefault(require("minimist"));
var _child_process = require("child_process");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function updatePackageJson(name, templatePath) {
  var packageJsonPath = _path["default"].join(templatePath, 'package.json');
  try {
    var packageJson = JSON.parse(_fs["default"].readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = name;
    _fs["default"].writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    console.error("Error updating package.json: ".concat(error));
  }
}
function updateWebpackConfig(name, templatePath) {
  var webpackConfigPath = _path["default"].join(templatePath, 'build', 'webpack.config.js');
  try {
    var webpackConfig = _fs["default"].readFileSync(webpackConfigPath, 'utf-8');
    webpackConfig = webpackConfig.replace(/const libraryName = ['"][^'"]+['"]/g, "const libraryName = '".concat(name, "'"));
    _fs["default"].writeFileSync(webpackConfigPath, webpackConfig);
  } catch (error) {
    console.error("Error updating webpack.config.js: ".concat(error));
  }
}
module.exports = function entry() {
  var cwd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var args = arguments.length > 1 ? arguments[1] : undefined;
  args = args || (0, _minimist["default"])(process.argv.slice(2), {
    string: ['_', 'p', 'path', 's', 'slug']
  });
  if (args._[0] === 'init') {
    var template = args.template || 'js'; // 默认为js模板
    var name = args._[1] || "webpack-".concat(template);
    var repositoryURL;
    if (template === 'ts') {
      // TypeScript模板的git仓库URL
      repositoryURL = 'https://github.com/nciyuan9264/webpack-ts.git'; // 替换为你的仓库URL
    } else {
      // JavaScript模板的git仓库URL
      repositoryURL = 'https://github.com/nciyuan9264/webpack-js.git'; // 替换为你的仓库URL
    }

    // 使用Git命令进行clone
    try {
      (0, _child_process.execSync)("git clone ".concat(repositoryURL, " ").concat(name), {
        stdio: 'inherit'
      });
      process.chdir(name);
      (0, _child_process.execSync)('rm -rf .git');

      // 更新package.json和webpack配置文件
      var templatePath = _path["default"].join(cwd, name);
      updatePackageJson(name, templatePath);
      updateWebpackConfig(name, templatePath);
      console.log("Project ".concat(name, " cloned successfully."));
    } catch (error) {
      console.error("Error while cloning project: ".concat(error));
    }
  } else {
    console.log('赶紧开发！');
  }
};