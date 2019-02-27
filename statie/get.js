#!/usr/bin/env node

require("@babel/register");

const mri = require("mri");
const os = require("os");
const { lstatSync } = require("fs");
const { join } = require("path");
const assert = require("assert");
const fixturify = require("fixturify");

const base = process.cwd();

// path where the directory containing value will be located
const { STATIE_SOURCE } = env.process;

assert(
  lstatSync(STATIE_SOURCE).isDirectory(),
  `
  Environment variable STATIE_SOURCE should reference a directory, 
  ${STATIE_SOURCE} is not a directory.
`
);

const value = fixturify(STATIE_SOURCE);

// path in the microstate that you will be reading
const {
  _: [path]
} = mri(process.argv.slice(2));

const Type = require(join(base, "statierc.js"));

console.log(`${path} from ${STATIE_SOURCE}`, value);

// const state = create(Type, value);