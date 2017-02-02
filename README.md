# npmts
Write npm modules with TypeScript without hassle. TypeScript ready. Fully ES6.

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/npmts)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/npmts)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/npmts)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/npmts/)

## Status for master
[![build status](https://gitlab.com/pushrocks/npmts/badges/master/build.svg)](https://gitlab.com/pushrocks/npmts/commits/master)
[![coverage report](https://gitlab.com/pushrocks/npmts/badges/master/coverage.svg)](https://gitlab.com/pushrocks/npmts/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/npmts.svg)](https://www.npmjs.com/package/npmts)
[![docker pulls](https://img.shields.io/docker/pulls/hosttoday/ht-docker-node.svg)](https://hub.docker.com/r/hosttoday/ht-docker-node/)
[![Dependency Status](https://david-dm.org/pushrocks/npmts.svg)](https://david-dm.org/pushrocks/npmts)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/npmts/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/npmts/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/npmts/badges/code.svg)](https://www.bithound.io/github/pushrocks/npmts)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Introduction
NPMTS is your friend when writing, testing, publishing and documenting npm modules written in TypeScript.

npmts will
    
1. check your dependencies and package.json (unused, missing, updates, security)
1. transpile your code with tsc,
1. test your code with mocha (supports the fancy stuff like Promises, Generators, async/await, sourcemaps)
1. create coverage with istanbul (supports tracing of the originating TypeScript)

This works on your machine and in CI. There is a prebuild docker image available that includes npmts to make CI a breeze:  
[hosttoday/ht-docker-node:npmts on Dockerhub](https://hub.docker.com/r/hosttoday/ht-docker-node/)

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** 2016 - 2017 [Lossless GmbH](https://lossless.gmbh)

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
