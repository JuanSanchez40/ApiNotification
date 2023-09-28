"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isJSon = (value) => {
    try {
        JSON.stringify(value);
    }
    catch (_) {
        return null;
    }
};
exports.default = isJSon;
