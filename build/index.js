"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GameRouter_1 = require("./routes/GameRouter");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/game', GameRouter_1.GameRouter);
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
//# sourceMappingURL=index.js.map