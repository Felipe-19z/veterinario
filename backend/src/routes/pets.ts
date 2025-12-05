
import { Router } from 'express';
import { createPet, getPets, updatePet, deletePet } from '../controllers/petController';

const router = Router();

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
router.post('/', createPet);

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
router.get('/', getPets);

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
router.put('/:id', updatePet);

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
router.delete('/:id', deletePet);

export default router;
