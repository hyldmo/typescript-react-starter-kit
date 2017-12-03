#!/bin/bash
mkdir prepublish_test
mkdir prepublish_test/lib/
mkdir prepublish_test/lib/ts-scripts/
cp package.json prepublish_test/lib/ts-scripts/package.json 
cp -r scripts prepublish_test/lib/ts-scripts/
cp __tests__/package-testfile.json prepublish_test/package.json

cd prepublish_test

npm install ./lib/ts-scripts
node lib/ts-scripts/scripts/postinstall.js

if cat package.json | grep -q "\"test\": \"jest\""; then
    exit 0
else
    echo "ERR: package.json not updated."
    exit 1
fi
