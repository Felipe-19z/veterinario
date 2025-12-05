"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.getPets = exports.createPet = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Controller to create a pet
const createPet = async (req, res) => {
    try {
        const { name, species, ownerName } = req.body;
        if (!name || !species || !ownerName) {
            return res.status(400).json({ error: 'All fields are required. Make sure to provide name, species, and ownerName.' });
        }
        // Find the owner by name to get the ownerId
        const owner = await prisma_1.default.client.findFirst({
            where: { name: ownerName },
        });
        if (!owner) {
            return res.status(404).json({ error: `Client with name '${ownerName}' not found.` });
        }
        const newPet = await prisma_1.default.pet.create({
            data: {
                name,
                species,
                ownerId: owner.id,
            },
        });
        res.status(201).json(newPet);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to register pet', details: error.message });
    }
};
exports.createPet = createPet;
// Placeholder for getPets
const getPets = async (req, res) => {
    res.status(501).json({ error: 'Not implemented' });
};
exports.getPets = getPets;
// Placeholder for updatePet
const updatePet = async (req, res) => {
    res.status(501).json({ error: 'Not implemented' });
};
exports.updatePet = updatePet;
// Placeholder for deletePet
const deletePet = async (req, res) => {
    res.status(501).json({ error: 'Not implemented' });
};
exports.deletePet = deletePet;
//# sourceMappingURL=petController.js.map