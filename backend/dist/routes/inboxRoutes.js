"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inboxController_1 = require("../controllers/inboxController");
const router = (0, express_1.Router)();
router.get('/', inboxController_1.getInboxMessages);
exports.default = router;
//# sourceMappingURL=inboxRoutes.js.map