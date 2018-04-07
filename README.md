# Typescript React Starter Kit #
[![Build Status](https://travis-ci.org/eivhyl/typescript-react-starter-kit.svg?branch=master)](https://travis-ci.org/eivhyl/typescript-react-starter-kit)
[![Coverage Status](https://coveralls.io/repos/github/eivhyl/typescript-react-starter-kit/badge.svg?branch=master)](https://coveralls.io/github/eivhyl/typescript-react-starter-kit?branch=master)
[![dependencies Status](https://david-dm.org/eivhyl/typescript-react-starter-kit/status.svg)](https://david-dm.org/eivhyl/typescript-react-starter-kit)
[![Known Vulnerabilities](https://snyk.io/test/github/eivhyl/typescript-react-starter-kit/badge.svg?targetFile=package.json)](https://snyk.io/test/github/eivhyl/typescript-react-starter-kit?targetFile=package.json)
[![NSP Status](https://nodesecurity.io/orgs/github-oss/projects/09375e0b-a362-4f49-81d3-fa2c685255ba/badge)](https://nodesecurity.io/orgs/github-oss/projects/09375e0b-a362-4f49-81d3-fa2c685255ba)
----

## Features ##
- [Typescript](http://www.typescriptlang.org/) for type-checking
- [TSLint](https://palantir.github.io/tslint/) to ensure consistent style
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Redux](https://redux.js.org/) + [Redux Saga](https://redux-saga.js.org/)
- [Jest](https://facebook.github.io/jest/) (with TS support) for unit/snapshot testing
- Code coverage from [coveralls.io](https://coveralls.io/)
- [Webpack](https://webpack.js.org/)
  - Hot Module Reloading
  - Bundle hashing to allow for easy caching (npm dependencies are also splitted so that you can update your source code without making the user reload the vendor bundle)
- [SCSS](https://sass-lang.com/) support
- [CSS Modules](https://github.com/css-modules/css-modules) for CSS namespacing
- Autoprefixing with [PostCSS](http://postcss.org/)
- [Stylelint](https://stylelint.io/) for linting SCSS/CSS
- [Travis](https://travis-ci.org/) for CI

To get started, run `npm i` or `yarn` to fetch dependencies and `npm run dev` or `yarn dev` to start the development server
