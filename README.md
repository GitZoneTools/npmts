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
by default npmts looks for an `./ts/index.ts` and a `./ts/test.ts` that will compile to
`./index.js` and `./test.js`

### Custom behaviour
We are currently building support for custom behaviour with a super simple config file.
Check back soon.

## Readme for Devs
There is a [README-dev.md](README-dev.md) in the repo.
This is only of interest for you if are looking to improve or build upon this package.