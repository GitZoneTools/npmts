---
name: Default Behaviour
---
# Default Behaviour
when you don't configure it otherwise.

1. **Config:** Check config in ./npmextra.json (Check out [npmextra](https://www.npmjs.com/package/npmextra))
1. **Clean:** Clean up from any previous builds (old js files)
1. **Check:** Check project for typings declaration in package.json, unused dependencies and missing dependencies
1. **Transpile:** Transpile TypeScript with **inline sourcemaps** and **declaration files** to ES target
1. **Test:** transpile TypeScript of module to ES5 for tests (so it can be instrumentalized) and pipe it to tapbuffer. All this happens in memory.