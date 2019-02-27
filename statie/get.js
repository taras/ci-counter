#!/usr/bin/env node

const { join } = require("path");

require("@babel/register")({ extends: join(__dirname, ".babelrc") });

const mri = require("mri");
const { lstatSync } = require("fs");
const assert = require("assert");
const { readSync } = require("fixturify");

const base = process.cwd();

// path where the directory containing value will be located
const { STATIE_SOURCE } = process.env;

assert(
  lstatSync(STATIE_SOURCE).isDirectory(),
  `
  Environment variable STATIE_SOURCE should reference a directory, 
  ${STATIE_SOURCE} is not a directory.
`
);

const value = readSync(STATIE_SOURCE);

// path in the microstate that you will be reading
const {
  _: [path]
} = mri(process.argv.slice(2));

const Type = require(join(base, "statierc.js"));

console.log(`${path} from ${STATIE_SOURCE}`, value, Type);

// const state = create(Type, value);
