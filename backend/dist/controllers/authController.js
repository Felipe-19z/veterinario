"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginVet = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const password_1 = require("../utils/password");
const register = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const hashedPassword = await (0, password_1.hashPassword)(password);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        res.status(400).json({ message: 'User already exists' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required' });
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                email_role: {
                    email,
                    role,
                },
            },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await (0, password_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User logged in successfully', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.login = login;
const loginVet = async (req, res) => {
    const { email, password } = req.body;
    if (email === 'matheus123@gmail.com' && password === '123456') {
        res.status(200).json({ message: 'Vet logged in successfully' });
    }
    else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};
exports.loginVet = loginVet;
//# sourceMappingURL=authController.js.map