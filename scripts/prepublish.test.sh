#!/bin/bash
libname='typescript-react-scripts'

mkdir prepublish_test
mkdir prepublish_test/lib/
mkdir prepublish_test/lib/$libname/
cp package.json prepublish_test/lib/$libname/package.json
cp -r scripts prepublish_test/lib/$libname/
cp __tests__/testfiles/package-testfile.json prepublish_test/package.json

cd prepublish_test

npm install ./lib/$libname
node lib/$libname/scripts/postinstall.js

if cat package.json | grep -q '"test": "jest"'; then
    exit 0
else
    echo 'ERR: package.json not updated.'
    exit 1
fi
