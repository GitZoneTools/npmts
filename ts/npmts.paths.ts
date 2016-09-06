import 'typings-global'
import plugins = require('./npmts.plugins')

// NPMTS Paths
export let npmtsPackageRoot = plugins.path.join(__dirname,'../')

// Project paths
export let cwd = process.cwd()

// Directories
export let tsDir = plugins.path.join(cwd,'ts/')
export let distDir = plugins.path.join(cwd,'dist/')
export let testDir = plugins.path.join(cwd,'test/')
export let typingsDir = plugins.path.join(cwd,'ts/typings/')
export let coverageDir = plugins.path.join(cwd,'coverage/')

// Pages
export let pagesDir = plugins.path.join(cwd,'pages/')
export let pagesApiDir = plugins.path.join(pagesDir,'/api')

export let npmtsAssetsDir = plugins.path.join(__dirname,'../assets/')

// Files
export let indexTS = plugins.path.join(cwd,'ts/index.ts')
export let testTS = plugins.path.join(cwd,'ts/test.ts')
