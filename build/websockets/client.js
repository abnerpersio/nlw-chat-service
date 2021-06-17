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
var UsersService_1 = require("../services/UsersService");
var MessagesService_1 = require("../services/MessagesService");
http_1.io.on('connect', function (socket) {
    var connectionsService = new ConnectionsService_1.ConnectionsService();
    var usersService = new UsersService_1.UsersService();
    var messagesService = new MessagesService_1.MessagesService();
    socket.on('client_first_access', function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var socket_id, _a, text, email, user_id, userAlreadyExists, user, connection, allMessages, allUsersWithoutAdmin;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    socket_id = socket.id;
                    _a = params, text = _a.text, email = _a.email;
                    user_id = null;
                    return [4 /*yield*/, usersService.findByEmail(email)];
                case 1:
                    userAlreadyExists = _b.sent();
                    if (!!userAlreadyExists) return [3 /*break*/, 4];
                    return [4 /*yield*/, usersService.create(email)];
                case 2:
                    user = _b.sent();
                    return [4 /*yield*/, connectionsService.create({
                            socket_id: socket_id,
                            user_id: user.id,
                        })];
                case 3:
                    _b.sent();
                    user_id = user.id;
                    return [3 /*break*/, 9];
                case 4:
                    user_id = userAlreadyExists.id;
                    return [4 /*yield*/, connectionsService.findByUserId(userAlreadyExists.id)];
                case 5:
                    connection = _b.sent();
                    if (!!connection) return [3 /*break*/, 7];
                    return [4 /*yield*/, connectionsService.create({
                            socket_id: socket_id,
                            user_id: userAlreadyExists.id,
                        })];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 7:
                    connection.socket_id = socket_id;
                    return [4 /*yield*/, connectionsService.create(connection)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [4 /*yield*/, messagesService.create({
                        text: text,
                        user_id: user_id,
                    })];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, messagesService.list(user_id)];
                case 11:
                    allMessages = _b.sent();
                    socket.emit('client_list_all_messages', allMessages);
                    return [4 /*yield*/, connectionsService.findAllWithoutAdmin()];
                case 12:
                    allUsersWithoutAdmin = _b.sent();
                    http_1.io.emit('admin_list_all_users', allUsersWithoutAdmin);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('client_send_to_admin', function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var text, socket_admin_id, socket_id, user_id, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    text = params.text, socket_admin_id = params.socket_admin_id;
                    socket_id = socket.id;
                    return [4 /*yield*/, connectionsService.findBySocketID(socket.id)];
                case 1:
                    user_id = (_a.sent()).user_id;
                    return [4 /*yield*/, messagesService.create({
                            text: text,
                            user_id: user_id,
                        })];
                case 2:
                    message = _a.sent();
                    http_1.io.to(socket_admin_id).emit('admin_receive_message', {
                        message: message,
                        socket_id: socket_id,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
