"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
const typeorm_1 = require("typeorm");
let Participant = class Participant {
};
exports.Participant = Participant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id' }) // map cột DB "Id"
    ,
    __metadata("design:type", Number)
], Participant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Name', nullable: true, type: 'text' }) // map cột DB "Name"
    ,
    __metadata("design:type", Object)
], Participant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Message', nullable: true, type: 'text' }) // map cột DB "Message"
    ,
    __metadata("design:type", Object)
], Participant.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'CreatedAt', type: 'timestamptz' }) // map cột DB "CreatedAt"
    ,
    __metadata("design:type", Date)
], Participant.prototype, "createdAt", void 0);
exports.Participant = Participant = __decorate([
    (0, typeorm_1.Entity)({ name: 'Participants' })
], Participant);
