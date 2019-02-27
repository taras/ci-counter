require("babel-register");

const mri = require("mri");
const os = require("os");
const { lstatSync } = require("fs");
const { join } = require("path");
const assert = require("assert");
const fixturify = require("fixturify");

const base = os.cwd();

// path where the directory containing value will be located
const { STATIE_VALUE_PATH } = env.process;

assert(
  lstatSync(STATIE_VALUE_PATH).isDirectory(),
  `
  Environment variable STATIE_VALUE_PATH should reference a directory, 
  ${STATIE_VALUE_PATH} is not a directory.
`
);

const value = fixturify(STATIE_VALUE_PATH);

// path in the microstate that you will be reading
const {
  _: [path]
} = mri(process.argv.slice(2));

const Type = require(join(base, "statierc.js"));

const state = create(Type, value);