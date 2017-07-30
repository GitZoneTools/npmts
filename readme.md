# npmts
Write npm modules with TypeScript without hassle. TypeScript ready. Fully ES6.

## Availabililty
[![npm](https://gitzone.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/npmts)
[![git](https://gitzone.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/gitzone/npmts)
[![git](https://gitzone.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/gitzone/npmts)
[![docs](https://gitzone.gitlab.io/assets/repo-button-docs.svg)](https://gitzone.gitlab.io/npmts/)

## Status for master
[![build status](https://GitLab.com/gitzone/npmts/badges/master/build.svg)](https://GitLab.com/gitzone/npmts/commits/master)
[![coverage report](https://GitLab.com/gitzone/npmts/badges/master/coverage.svg)](https://GitLab.com/gitzone/npmts/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/npmts.svg)](https://www.npmjs.com/package/npmts)
[![Dependency Status](https://david-dm.org/gitzonetools/npmts.svg)](https://david-dm.org/gitzonetools/npmts)
[![bitHound Dependencies](https://www.bithound.io/github/gitzonetools/npmts/badges/dependencies.svg)](https://www.bithound.io/github/gitzonetools/npmts/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/gitzonetools/npmts/badges/code.svg)](https://www.bithound.io/github/gitzonetools/npmts)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Quick Demo
[![asciicast](https://asciinema.org/a/9c3assmh21i49qhe5lmi48sze.png)](https://asciinema.org/a/9c3assmh21i49qhe5lmi48sze?speed=2&t=0)

## Usage
NPMTS is your friend when writing, testing, publishing and documenting npm modules written in TypeScript.

npmts will

1. check your dependencies and package.json (unused, missing, updates, security)
1. transpile your code with tsc,
1. test your code with tap (supports the fancy stuff like Promises, Generators, async/await, sourcemaps, parallel test execution in child processes)
1. create coverage with istanbul (supports tracing of the originating TypeScript)

For more information on how tests are run check out the [tapbuffer module](https://www.npmjs.com/package/tapbuffer).

For more information about how to best write tap tests check out the [tapbundle module's linked docs](https://www.npmjs.com/package/tapbundle).

This works on your machine and in CI. There is a prebuild docker image available that includes npmts to make CI a breeze:  
[hosttoday/ht-docker-node:npmts on Dockerhub](https://hub.docker.com/r/hosttoday/ht-docker-node/)

## Changelog
For breaking changes please see the [changelog](https://gitzone.gitlab.io/npmts/changelog.html).

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://gitzone.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
