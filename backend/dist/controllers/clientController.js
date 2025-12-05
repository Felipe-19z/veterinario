"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClients = exports.createClient = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createClient = async (req, res) => {
    const { name, userId } = req.body;
    try {
        const client = await prisma_1.default.client.create({
            data: {
                name,
                user: { connect: { id: userId } },
            },
        });
        res.status(201).json(client);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating client' });
    }
};
exports.createClient = createClient;
const getClients = async (req, res) => {
    try {
        const clients = await prisma_1.default.client.findMany();
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving clients' });
    }
};
exports.getClients = getClients;
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const client = await prisma_1.default.client.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.status(200).json(client);
    }
    catch (error) {
        res.status(404).json({ message: 'Client not found' });
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.default.client.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Client deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: 'Client not found' });
    }
};
exports.deleteClient = deleteClient;
//# sourceMappingURL=clientController.js.map