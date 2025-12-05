"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
// Existing routes
router.post('/', appointmentController_1.createAppointment);
router.get('/', appointmentController_1.getAppointments); // This will be used by the vet to see all appointments
router.put('/:id', appointmentController_1.updateAppointment); // This will be used to edit
// New route for cancellation
router.post('/:id/cancel', appointmentController_1.cancelAppointment);
exports.default = router;
//# sourceMappingURL=appointments.js.map