"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smartsystem_1 = require("smartsystem");
exports.modCompile = new smartsystem_1.LazyModule('./mod_compile/index', __dirname);
exports.modDocs = new smartsystem_1.LazyModule('./mod_docs/index', __dirname);
exports.modTest = new smartsystem_1.LazyModule('./mod_test/index', __dirname);
