import { http } from './http';
import './websockets/client';
import './websockets/admin';

http.listen(3333);
