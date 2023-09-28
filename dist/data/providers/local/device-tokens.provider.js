"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeviceTokensProvider {
    constructor(deviceTokens) {
        this.deviceTokens = deviceTokens;
    }
    create(deviceToken) {
        const tmp = Object.assign(Object.assign({}, deviceToken), { id: this.deviceTokens.length + 1 });
        this.deviceTokens.push(tmp);
        return tmp;
    }
    update(id, value) {
        const index = this.deviceTokens.findIndex((e) => e.id == id);
        if (index != -1) {
            this.deviceTokens[index] = Object.assign(Object.assign({}, this.deviceTokens[index]), { value });
        }
    }
    getTokens(userEmail) {
        const list = this.deviceTokens.filter((e) => (e.userEmail = userEmail));
        return list.map((e) => e.value);
    }
    deleteById(id) {
        // console.log("delteById before ", this.deviceTokens.length);
        const index = this.deviceTokens.findIndex((e) => e.id == id);
        if (index != -1) {
            this.deviceTokens.splice(index, 1);
        }
        // console.log('deleteById after ', this.deviceTokens.length);
    }
    deleteByValue(value) {
        // console.log('deleteByValue before ', this.deviceTokens.length);
        const index = this.deviceTokens.findIndex((e) => e.value == value);
        if (index != -1) {
            this.deviceTokens.splice(index, 1);
        }
        // console.log('deleteByValue after ', this.deviceTokens.length);
    }
}
exports.default = DeviceTokensProvider;
