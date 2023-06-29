"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
exports.GameRouter = express_1.default.Router();
exports.GameRouter.use('/', express_1.default.static(path_1.default.join(__dirname, '../../dist/game/index.html')));
exports.GameRouter.use('/bundle.js', express_1.default.static(path_1.default.join(__dirname, '../../dist/game/bundle.js')));
exports.GameRouter.use('/styles.css', express_1.default.static(path_1.default.join(__dirname, '../../dist/game/styles.css')));
//# sourceMappingURL=GameRouter.js.map