import * as q from 'smartq'
import { ProjectinfoNpm } from 'projectinfo'

import * as paths from '../npmts.paths'

import * as plugins from './mod00.plugins'

export let projectInfo: ProjectinfoNpm

let checkProjectTypings = (configArg) => {
  let done = q.defer()
  plugins.beautylog.ora.text('Check Module: Check Project Typings...')
  projectInfo = new ProjectinfoNpm(paths.cwd)
  if (typeof projectInfo.packageJson.typings === 'undefined') {
    plugins.beautylog.error(`please add typings field to package.json`)
    process.exit(1)
  };
  done.resolve(configArg)
  return done.promise
}

const depcheckOptions = {
  ignoreBinPackage: false, // ignore the packages with bin entry
  parsers: { // the target parsers
    '*.ts': plugins.depcheck.parser.typescript
  },
  detectors: [ // the target detectors
    plugins.depcheck.detector.requireCallExpression,
    plugins.depcheck.detector.importDeclaration
  ],
  specials: [ // the target special parsers
    plugins.depcheck.special.eslint,
    plugins.depcheck.special.webpack
  ]
}

let checkDependencies = (configArg) => {
  let done = q.defer()
  plugins.beautylog.ora.text('Check Module: Check Dependencies...')
  let depcheckOptionsMerged = plugins.lodash.merge(depcheckOptions, {
    ignoreDirs: [ // folder with these names will be ignored
      'test',
      'dist',
      'bower_components'
    ],
    ignoreMatches: [ // ignore dependencies that matches these globs
      '@types/*',
      'babel-preset-*'
    ]
  })
  plugins.depcheck(paths.cwd, depcheckOptionsMerged, (unused) => {
    for (let item of unused.dependencies) {
      plugins.beautylog.warn(`Watch out: unused dependency "${item}"`)
    }
    for (let item in unused.missing) {
      plugins.beautylog.error(`missing dependency "${item}" in package.json`)
    }
    if (unused.missing.length > 0) {
      plugins.beautylog.info('exiting due to missing dependencies in package.json')
      process.exit(1)
    }
    for (let item in unused.invalidFiles) {
      plugins.beautylog.warn(`Watch out: could not parse file ${item}`)
    };
    for (let item in unused.invalidDirs) {
      plugins.beautylog.warn(`Watch out: could not parse directory ${item}`)
    }
    done.resolve(configArg)
  })
  return done.promise
}

let checkDevDependencies = (configArg) => {
  let done = q.defer()
  plugins.beautylog.ora.text('Check Module: Check devDependencies...')
  let depcheckOptionsMerged = plugins.lodash.merge(depcheckOptions, {
    ignoreDirs: [ // folder with these names will be ignored
      'ts',
      'dist',
      'bower_components'
    ],
    ignoreMatches: [ // ignore dependencies that matches these globs
      '@types/*',
      'babel-preset-*'
    ]
  })
  plugins.depcheck(paths.cwd, depcheckOptionsMerged, (unused) => {
    for (let item of unused.devDependencies) {
      plugins.beautylog.log(`unused devDependency ${item}`)
    }
    for (let item in unused.missing) {
      plugins.beautylog.error(`missing devDependency ${item}`)
    }
    if (unused.missing.length > 0) {
      plugins.beautylog.info('exiting due to missing dependencies in package.json')
      process.exit(1)
    }
    for (let item in unused.invalidFiles) {
      plugins.beautylog.warn(`Watch out: could not parse file ${item}`)
    }
    for (let item in unused.invalidDirs) {
      plugins.beautylog.warn(`Watch out: could not parse directory ${item}`)
    }
    done.resolve(configArg)
  })
  return done.promise
}

let checkNodeVersion = (configArg) => {
  let done = q.defer()
  plugins.beautylog.ora.text('checking node version')
  done.resolve(configArg)
  return done.promise
}

export let run = (configArg) => {
  let done = q.defer()
  plugins.beautylog.ora.text('Check Module: ...')
  checkProjectTypings(configArg)
    .then(checkDependencies)
    .then(checkDevDependencies)
    .then(checkNodeVersion)
    .then(done.resolve)
    .catch((err) => { console.log(err) })
  return done.promise
}
