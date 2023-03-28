# NPM Deep Dive

## Setup

- Node 16
- `pnpm`

## Tutorial

### 1. Basic NPM Package Setup

_Ref: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/2cb150cf162f446cb8efcd06763b30435b8afcb8_

Three main files to be aware of:

1. The library's entrypoint
   https://github.com/aaronklinker-st/npm-package-deep-dive/blob/2cb150cf162f446cb8efcd06763b30435b8afcb8/lib/index.js#L1-L13
2. The Website's script where `getContributors` is used
   https://github.com/aaronklinker-st/npm-package-deep-dive/blob/2cb150cf162f446cb8efcd06763b30435b8afcb8/web/src/main.ts#L1-L25
3. The CLI's entrypoint where `getContributors` is used
   https://github.com/aaronklinker-st/npm-package-deep-dive/blob/2cb150cf162f446cb8efcd06763b30435b8afcb8/cli/index.js#L1-L19

Next, publish the first version of the NPM package.

```sh
pnpm publish --no-git-checks
```

Install in the `web` and `cli` package, make sure they work.

### 2. Supporting Node 16

_Ref: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/78a2e29dd2ffe405de497dcd046dd48e55c8efde_

Node 16 doesn't include the `fetch` API. If we want to support Node 16, we'll need to use a library, like `ofetch`.

Diff: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/78a2e29dd2ffe405de497dcd046dd48e55c8efde#

1. Install `ofetch` and use it in the `lib/index.js` file
2. Publish a new version
3. Install latest version in `web` and `cli` packages, make sure they work

### 3. Include CJS Support

_Ref: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/ef8444364c865aad4d0b5ae1b9db4c310eec54b8 & https://github.com/aaronklinker-st/npm-package-deep-dive/commit/58facc2f71c3c96a2b61d26bee73caea0df1a887_

The package will not work in a CJS project.

Return to presentation to talk about modules.

So lets convert our CLI to CJS, and publish both a CJS, ESM, and for kicks and giggles, IIFE.

Follow this diff: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/ef8444364c865aad4d0b5ae1b9db4c310eec54b8

Then:

1. Install TSUP
2. Add `build` and `prepublish` script
   https://github.com/aaronklinker-st/npm-package-deep-dive/blob/58facc2f71c3c96a2b61d26bee73caea0df1a887/lib/package.json#L15-L16
3. Discuss flags for build script
4. Make additional changes to the `package.json`
   https://github.com/aaronklinker-st/npm-package-deep-dive/commit/58facc2f71c3c96a2b61d26bee73caea0df1a887#diff-1e946220773aef913945326261b7ee8d08b8ec29ccc66ef7c348950439212ffb
5. Publish new version
6. Show that it works with `cli`, a CJS project, and `web`, an ESM project

### 4. Adding Declaration File

_Ref: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/9375762bda5daa015afc37017cd587cff9223e78_

Return to slides talk about typescript.

1. Add declaration file
2. Publish new version
3. Show how types are now provided to consumers and on NPM

### 5. Full TypeScript Package

_Ref: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/0a1694b022e4e9a8e8454034e717ecce35153785_

Fully convert the project to typescript: https://github.com/aaronklinker-st/npm-package-deep-dive/commit/0a1694b022e4e9a8e8454034e717ecce35153785

1. Convert the JS file to TS
2. Delete the declaration file
3. Build declaration file
4. Include package types field
5. Add TS config file
