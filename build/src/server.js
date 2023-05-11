"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_router_1 = __importDefault(require("./routers/user-router"));
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use('/', user_router_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
