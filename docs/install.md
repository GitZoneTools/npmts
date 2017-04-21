# Install npmts
Get started with TypeScript awesomeness.

> **npmts-g* checks if the global version of npmts suffices the modules requirements.
If not it installs npmts locally in the right version during npm install. 

```sh
npm install npmts -g # installs npmts globally
npm install npmts-g --save-dev # installs npmts-g checking tool as devDependency
```

Then add it to your package.json's script section to trigger a build:

```json
"scripts": {
    "test": "(npmts)"
}
```