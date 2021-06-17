"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.http = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var path_1 = __importDefault(require("path"));
require("./database");
var routes_1 = require("./routes");
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.set('views', path_1.default.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/client', function (req, res) {
    return res.render('html/client.html');
});
app.get('/admin', function (req, res) {
    return res.render('html/admin.html');
});
var http = http_1.createServer(app); // Criando server protocolo http
exports.http = http;
var io = new socket_io_1.Server(http); // Criando server protocolo websocket
exports.io = io;
io.on('connection', function (socket) {
    // console.log('Se conectou', socket.id);
});
app.use(express_1.default.json());
app.use(routes_1.routes);
