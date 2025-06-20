"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const data_source_1 = require("./config/data-source");
const danhmuc_route_1 = __importDefault(require("./routes/danhmuc.route"));
const moment_route_1 = __importDefault(require("./routes/moment.route"));
const participant_route_1 = __importDefault(require("./routes/participant.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
dotenv.config(); // Đọc .env đầu tiên
const app = (0, express_1.default)();
// CORS: cho phép từ local và Netlify
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
// Parse JSON body
app.use(express_1.default.json());
// Các router API
app.use('/api/danhmuc', danhmuc_route_1.default);
app.use('/api/participants', participant_route_1.default);
app.use('/api/moments', moment_route_1.default);
// Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Kết nối DB và khởi động server
const PORT = process.env.PORT || 3001;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
})
    .catch((err) => {
    console.error('❌ Database connection error:', err);
});
