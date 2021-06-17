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
var http_1 = require("../http");
var ConnectionsService_1 = require("../services/ConnectionsService");
var MessagesService_1 = require("../services/MessagesService");
http_1.io.on('connect', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var connectionsService, messagesService, allConnectionsWithoutAdmin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connectionsService = new ConnectionsService_1.ConnectionsService();
                messagesService = new MessagesService_1.MessagesService();
                return [4 /*yield*/, connectionsService.findAllWithoutAdmin()];
            case 1:
                allConnectionsWithoutAdmin = _a.sent();
                // send to all users that are connected, doesn't happen only one time
                // using socket.emit is the same as req and res from http protocol
                // when you recieve something and give back something
                // here you just send back
                http_1.io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
                socket.on('admin_list_messages_by_user', function (params, callback) { return __awaiter(void 0, void 0, void 0, function () {
                    var user_id, allMessages;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                user_id = params.user_id;
                                return [4 /*yield*/, messagesService.list(user_id)];
                            case 1:
                                allMessages = _a.sent();
                                callback(allMessages);
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('admin_send_message', function (params) { return __awaiter(void 0, void 0, void 0, function () {
                    var user_id, text, message, socket_id;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                user_id = params.user_id, text = params.text;
                                return [4 /*yield*/, messagesService.create({
                                        text: text,
                                        user_id: user_id,
                                        admin_id: socket.id,
                                    })];
                            case 1:
                                message = _a.sent();
                                return [4 /*yield*/, connectionsService.findByUserId(user_id)];
                            case 2:
                                socket_id = (_a.sent()).socket_id;
                                http_1.io.to(socket_id).emit('admin_send_to_client', {
                                    text: text,
                                    socket_id: socket.id,
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('admin_user_in_support', function (params) { return __awaiter(void 0, void 0, void 0, function () {
                    var user_id, allConnectionsWithoutAdmin;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                user_id = params.user_id;
                                return [4 /*yield*/, connectionsService.updateAdminID(user_id, socket.id)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, connectionsService.findAllWithoutAdmin()];
                            case 2:
                                allConnectionsWithoutAdmin = _a.sent();
                                http_1.io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
