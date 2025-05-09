"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const client_1 = require("@apollo/client");
exports.client = new client_1.ApolloClient({
    uri: 'http://localhost:4000',
    cache: new client_1.InMemoryCache(),
});
