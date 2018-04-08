import * as q from 'smartq';

import paths = require('../npmts.paths');

import plugins = require('./mod.plugins');
import { projectInfo } from '../mod_compile/mod.check';

export let run = function(configArg) {
  let done = q.defer();
  let config = configArg;
  plugins.beautylog.ora.text('now looking at ' + 'required assets');
  if (config.cli === true) {
    let mainJsPath = projectInfo.packageJson.main;
    let cliJsString: string = plugins.smartfile.fs.toStringSync(
      plugins.path.join(paths.npmtsAssetsDir, 'cli.js')
    );
    cliJsString = cliJsString.replace('{{pathToIndex}}', mainJsPath);
    plugins.smartfile.memory.toFsSync(cliJsString, plugins.path.join(paths.distDir, 'cli.js'));
    plugins.beautylog.ok('installed CLI assets!');
    done.resolve(config);
  } else {
    plugins.beautylog.ok('No additional assets required!');
    done.resolve(config);
  }
  return done.promise;
};
