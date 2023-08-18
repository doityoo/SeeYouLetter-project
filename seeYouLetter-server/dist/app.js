"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const sendData = {
    name: 'name',
    age: 3,
    url: 'tistory.com',
};
app.get('/get', (req, res) => {
    res.send(sendData);
});
app.listen(8080);
