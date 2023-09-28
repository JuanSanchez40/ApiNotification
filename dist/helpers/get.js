"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _Get {
    constructor() {
        this.data = new Map();
    }
    put(key, dependency) {
        this.data.set(key, dependency);
    }
    find(key) {
        if (!this.data.has(key)) {
            throw new Error(`dependency ${key} not found`);
        }
        return this.data.get(key);
    }
}
const Get = new _Get();
exports.default = Get;
