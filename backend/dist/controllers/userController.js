"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.logoutUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const logoutUser = async (req, res) => {
    try {
        // Em um cenário real, você invalidaria o token de sessão aqui.
        // Por enquanto, apenas retornamos uma mensagem de sucesso.
        res.status(200).json({ message: 'Logout bem-sucedido' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao fazer logout' });
    }
};
exports.logoutUser = logoutUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.default.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map