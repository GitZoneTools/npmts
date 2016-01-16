# npmts
Write npm modules with TypeScript withour hassle.

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
by default npmts looks in your `./ts/` directory for an `index.ts` and a `test.ts` that will compile to
./index.js and ./test.js