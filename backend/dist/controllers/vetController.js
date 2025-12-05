"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVet = exports.updateVet = exports.getVets = exports.createVet = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createVet = async (req, res) => {
    const { name, userId } = req.body;
    try {
        const vet = await prisma_1.default.vet.create({
            data: {
                name,
                user: { connect: { id: userId } },
            },
        });
        res.status(201).json(vet);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating vet' });
    }
};
exports.createVet = createVet;
const getVets = async (req, res) => {
    try {
        const vets = await prisma_1.default.vet.findMany();
        res.status(200).json(vets);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving vets' });
    }
};
exports.getVets = getVets;
const updateVet = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const vet = await prisma_1.default.vet.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.status(200).json(vet);
    }
    catch (error) {
        res.status(404).json({ message: 'Vet not found' });
    }
};
exports.updateVet = updateVet;
const deleteVet = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.default.vet.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Vet deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: 'Vet not found' });
    }
};
exports.deleteVet = deleteVet;
//# sourceMappingURL=vetController.js.map