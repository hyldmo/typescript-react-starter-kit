# Typescript React Starter Kit #
![.github/workflows/main.yml](https://github.com/hyldmo/typescript-react-starter-kit/workflows/.github/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/hyldmo/typescript-react-starter-kit/badge.svg?branch=master)](https://coveralls.io/github/hyldmo/typescript-react-starter-kit?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/b2948fd44e995919bdf7/maintainability)](https://codeclimate.com/github/hyldmo/typescript-react-starter-kit/maintainability)
[![dependencies Status](https://david-dm.org/hyldmo/typescript-react-starter-kit/status.svg)](https://david-dm.org/hyldmo/typescript-react-starter-kit)
[![devDependencies Status](https://david-dm.org/hyldmo/typescript-react-starter-kit/dev-status.svg)](https://david-dm.org/hyldmo/typescript-react-starter-kit?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/hyldmo/typescript-react-starter-kit/badge.svg?targetFile=package.json)](https://snyk.io/test/github/hyldmo/typescript-react-starter-kit?targetFile=package.json)
----

## Overview ##
This repository showcases a bunch of different technologies and frameworks that I use when developing React projects, combined into an opinionated boilerplate.

## Features ##
- [Typescript](http://www.typescriptlang.org/) for type-checking
- [TSLint](https://palantir.github.io/tslint/) to ensure consistent style
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Redux](https://redux.js.org/) + [Redux Saga](https://redux-saga.js.org/)
- [Cypress](https://www.cypress.io/) for end-to-end testing
- [Jest](https://facebook.github.io/jest/) for unit/snapshot testing
- Code coverage from [coveralls.io](https://coveralls.io/)
- [Webpack](https://webpack.js.org/)
  - Hot Module Reloading
  - Bundle hashing to allow for easy caching (npm dependencies are also splitted so that you can update your source code without making the user reload the vendor bundle)
- [less](http://lesscss.org/) support
- Autoprefixing with [PostCSS](http://postcss.org/)
- [Stylelint](https://stylelint.io/) for linting less/CSS
- [Github Actions](https://github.com/hyldmo/typescript-react-starter-kit/actions) for CI

To get started, run `yarn` to fetch dependencies and `yarn dev` to start the development server
