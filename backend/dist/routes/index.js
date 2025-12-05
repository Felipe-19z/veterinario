"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const vets_1 = __importDefault(require("./vets"));
const clients_1 = __importDefault(require("./clients"));
const pets_1 = __importDefault(require("./pets"));
const appointments_1 = __importDefault(require("./appointments"));
const inboxRoutes_1 = __importDefault(require("./inboxRoutes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/vets', vets_1.default);
router.use('/clients', clients_1.default);
router.use('/pets', pets_1.default);
router.use('/appointments', appointments_1.default);
router.use('/inbox', inboxRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map