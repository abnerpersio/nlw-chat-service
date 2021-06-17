"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
require("./websockets/client");
require("./websockets/admin");
http_1.http.listen(3333);
