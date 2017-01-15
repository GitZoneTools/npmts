# Default task execution of npmts

1. **Config:** Check config in ./npmextra.json (Check out [npmextra](https://www.npmjs.com/package/npmextra))
1. **Clean:** Clean up from any previous builds (old js files)
1. **Check:** Check project for typings declaration in package.json, unused dependencies and missing dependencies
1. **Transpile:** Transpile TypeScript with **inline sourcemaps** and **declaration files** to ES target
1. **Test:** Babelify ES6 to ES5 on the fly, instrumentalize ES5 JavaScript with istanbul and run tests with Mocha.