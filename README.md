# npmts
Write npm modules with TypeScript without hassle.

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
by default npmts looks for `./ts/index.ts` and `./ts/test.ts` that will compile to
`./index.js` and `./test.js`

npmts also creates a index.d.ts declaration file.
You can reference it in your package.json like this:

```json
"main": "index.js",
"typings": "./index.d.ts",
```

When requiring the module from other TypeScript files,
the TypeScript Compiler will use the declaration file to resolve typings.

#### Declaration files

### Custom behaviour
We are currently building support for custom behaviour with a super simple config file.
Check back soon.

## Readme for Devs
There is a [README-dev.md](README-dev.md) in the repo.
This is only of interest for you when looking to contribute to, improve or build upon this package.