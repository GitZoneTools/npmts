# npmts
Write npm modules with TypeScript without hassle.

## Status
[![Coverage Status](https://coveralls.io/repos/github/pushrocks/npmts/badge.svg?branch=master)](https://coveralls.io/github/pushrocks/npmts?branch=master)

## How to use npmts

### Install
First install npmts as dev dependency:

```sh
npm install npmts --save-dev
```

Then use it in package.json's script section to trigger a build:

```json
"scripts": {
    "test": "npmts"
}
```

### Default behaviour

**Execution order of tasks**

1. Install typings
2. Compile TypeScript
3. Create Declartion Files
4. Instrumentalize created JavaScript files with istanbul
5. Run Tests
6. Create Coverage report
7. Upload Coverage reports to travis (must be activated, only triggers on travis)


#### Typings
**npmts** looks for `./ts/typings.json` by default and installs any defined typings to `.ts/typings/`.
You can then reference the ./ts/typings/main.d.ts file in your TypeScript code.

#### TypeScript
by default npmts looks for `./ts/index.ts` and `./ts/test.ts` that will compile to
`./index.js` and `./test.js`

#### Declaration files
**npmts** also creates an `index.d.ts` declaration file by default.
You can reference it in your package.json like this:

```json
"main": "index.js",
"typings": "./index.d.ts",
```

#### Instrumentalize Code
npmts instrumentalizes the created JavaScript code to create a coverage report.

#### Tests
When Typings have been installed, TypeScript + Declaration files have been transpiled and the resulting JS has been instrumentalized,
npmts runs `.test/test.js` with mocha. 

When requiring the module from other TypeScript files,
the TypeScript Compiler will use the declaration file to resolve typings.



### Custom behaviour
Custom behaviour can be achieved through a config file at the root of your package.
The file must be named **npmts.json**

```json
{
  "mode":"custom",
  "ts":{
    "./customdir/custom.ts":"./customcompiled.js"
  },
  "typings":[
    "./customdir"
  ]
}
```

* **mode** can be "default" or "custom"
* **ts** You can list as many TypeScript files as you like. The key represents the source TypeScript file, the value the output file.
* **typings** is an array of all direcories that have a typings.json present. Uses the new typings tool from npm.


## Readme for Devs
There is a [README-dev.md](README-dev.md) in the repo.
This is only of interest for you when looking to contribute to, improve or build upon this package.