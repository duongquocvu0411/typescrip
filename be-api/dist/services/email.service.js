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
exports.EmailService = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class EmailService {
    constructor() {
        this.settings = {
            apiKey: process.env.SENDGRID_API_KEY,
            senderEmail: process.env.SENDGRID_SENDER_EMAIL,
            senderName: process.env.SENDGRID_SENDER_NAME,
            adminEmail: process.env.SENDGRID_ADMIN_EMAIL,
        };
        mail_1.default.setApiKey(this.settings.apiKey);
    }
    async sendParticipantNotificationAsync(name, message) {
        const msg = {
            to: this.settings.adminEmail,
            from: {
                email: this.settings.senderEmail,
                name: this.settings.senderName,
            },
            subject: `🎓 Người tham gia mới: ${name}`,
            text: message || '(Không có nội dung)',
            html: `<p><strong>${name}</strong> đã xác nhận tham gia và để lại lời chúc:</p><p>${message || '(Không có nội dung)'}</p>`,
        };
        // 👉 Ghi log nội dung email ra console
        console.log('📧 Email chuẩn bị gửi:');
        console.log(JSON.stringify(msg, null, 2));
        try {
            await mail_1.default.send(msg);
            console.log('✅ Email participant notification đã gửi thành công');
        }
        catch (error) {
            console.error('❌ Lỗi gửi email:', error);
            if (error.response) {
                console.error(error.response.body);
            }
        }
    }
}
exports.EmailService = EmailService;
