
import { Router } from 'express';
import { createVet, getVets, updateVet, deleteVet } from '../controllers/vetController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vets
 *   description: Vet management
 */

/**
 * @swagger
 * /api/vets:
 *   post:
 *     tags: [Vets]
 *     summary: Create a new vet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Vet created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createVet);

/**
 * @swagger
 * /api/vets:
 *   get:
 *     tags: [Vets]
 *     summary: Get all vets
 *     responses:
 *       200:
 *         description: A list of vets
 */
router.get('/', getVets);

/**
 * @swagger
 * /api/vets/{id}:
 *   put:
 *     tags: [Vets]
 *     summary: Update a vet
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
 *     responses:
 *       200:
 *         description: Vet updated successfully
 *       404:
 *         description: Vet not found
 */
router.put('/:id', updateVet);

/**
 * @swagger
 * /api/vets/{id}:
 *   delete:
 *     tags: [Vets]
 *     summary: Delete a vet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vet deleted successfully
 *       404:
 *         description: Vet not found
 */
router.delete('/:id', deleteVet);

export default router;
