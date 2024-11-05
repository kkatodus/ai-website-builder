"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const userRepository_1 = require("@repository/userRepository");
const createUser = async (UserData) => {
    return await (0, userRepository_1.createUser)(UserData);
};
exports.createUser = createUser;
