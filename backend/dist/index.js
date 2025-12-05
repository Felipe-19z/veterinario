"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const feedbackRoutes_1 = __importDefault(require("./routes/feedbackRoutes")); // Import feedback routes
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Veterinary Clinic API',
            version: '1.0.0',
            description: 'API for managing a veterinary clinic',
        },
        servers: [
            {
                url: 'https://3333-firebase-veterinario-1764686849225.cluster-lr6dwlc2lzbcctqhqorax5zmro.cloudworkstations.dev',
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Enable CORS for all origins and methods
app.use((0, cors_1.default)({
    origin: '*', // Explicitly allowing all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing all necessary methods
}));
app.use(express_1.default.json());
app.use('/api', index_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/feedback', feedbackRoutes_1.default); // Use feedback routes
app.get('/', (req, res) => {
    res.send('Welcome to the Veterinary Clinic API!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map