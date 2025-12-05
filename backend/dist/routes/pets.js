"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petController_1 = require("../controllers/petController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management
 */
/**
 * @swagger
 * /api/pets:
 *   post:
 *     tags: [Pets]
 *     summary: Create a new pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               ownerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pet created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', petController_1.createPet);
/**
 * @swagger
 * /api/pets:
 *   get:
 *     tags: [Pets]
 *     summary: Get all pets
 *     responses:
 *       200:
 *         description: A list of pets
 */
router.get('/', petController_1.getPets);
/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     tags: [Pets]
 *     summary: Update a pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *       404:
 *         description: Pet not found
 */
router.put('/:id', petController_1.updatePet);
/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     tags: [Pets]
 *     summary: Delete a pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *       404:
 *         description: Pet not found
 */
router.delete('/:id', petController_1.deletePet);
exports.default = router;
//# sourceMappingURL=pets.js.map