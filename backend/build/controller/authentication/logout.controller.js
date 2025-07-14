"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout = (req, res) => {
    res.clearCookie("AuthTokenCodey");
    res.status(200).json({ message: "Loged out successfuly" });
};
exports.default = logout;
