import minimist from 'minimist';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
function updatePackageJson(name, templatePath) {
  const packageJsonPath = path.join(templatePath, 'package.json');
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = name;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    console.error(`Error updating package.json: ${error}`);
  }
}

function updateWebpackConfig(name, templatePath) {
  const webpackConfigPath = path.join(templatePath, 'build', 'webpack.config.js');
  try {
    let webpackConfig = fs.readFileSync(webpackConfigPath, 'utf-8');
    webpackConfig = webpackConfig.replace(/const libraryName = ['"][^'"]+['"]/g, `const libraryName = '${name}'`);
    fs.writeFileSync(webpackConfigPath, webpackConfig);
  } catch (error) {
    console.error(`Error updating webpack.config.js: ${error}`);
  }
}

module.exports = function entry(cwd = process.cwd(), args) {
  args = args || minimist(process.argv.slice(2), { string: ['_', 'p', 'path', 's', 'slug'] });

  if (args._[0] === 'init') {
    const template = args.template || 'js'; // 默认为js模板
    const name = args._[1] || `webpack-${template}`;

    let repositoryURL;
    if (template === 'ts') {
      // TypeScript模板的git仓库URL
      repositoryURL = 'https://github.com/nciyuan9264/webpack-ts.git'; // 替换为你的仓库URL
    } else {
      // JavaScript模板的git仓库URL
      repositoryURL = 'https://github.com/nciyuan9264/webpack-js.git'; // 替换为你的仓库URL
    }

    // 使用Git命令进行clone
    try {
      execSync(`git clone ${repositoryURL} ${name}`, { stdio: 'inherit' });
      process.chdir(name);
      execSync('rm -rf .git');

      // 更新package.json和webpack配置文件
      const templatePath = path.join(cwd, name);
      updatePackageJson(name, templatePath);
      updateWebpackConfig(name, templatePath);

      console.log(`Project ${name} cloned successfully.`);
    } catch (error) {
      console.error(`Error while cloning project: ${error}`);
    }
  } else {
    console.log('赶紧开发！');
  }
};
