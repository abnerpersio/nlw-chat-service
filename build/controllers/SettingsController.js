"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
var SettingsService_1 = require("../services/SettingsService");
var SettingsController = /** @class */ (function () {
    function SettingsController() {
    }
    SettingsController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var settingsService, _a, chat, username, settings, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        settingsService = new SettingsService_1.SettingsService();
                        _a = req.body, chat = _a.chat, username = _a.username;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, settingsService.create({ chat: chat, username: username })];
                    case 2:
                        settings = _b.sent();
                        return [2 /*return*/, res.json(settings)];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ code: 1, message: error_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SettingsController.prototype.findByUsername = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var settingsService, username, settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        settingsService = new SettingsService_1.SettingsService();
                        username = req.params.username;
                        return [4 /*yield*/, settingsService.findByUsername(username)];
                    case 1:
                        settings = _a.sent();
                        return [2 /*return*/, res.json(settings)];
                }
            });
        });
    };
    SettingsController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var settingsService, username, chat, settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        settingsService = new SettingsService_1.SettingsService();
                        username = req.params.username;
                        chat = req.body.chat;
                        return [4 /*yield*/, settingsService.update(username, chat)];
                    case 1:
                        settings = _a.sent();
                        return [2 /*return*/, res.json(settings)];
                }
            });
        });
    };
    return SettingsController;
}());
exports.SettingsController = SettingsController;
