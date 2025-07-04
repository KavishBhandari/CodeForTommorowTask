const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

class CommonHelper {
    hashedPassword = async (password) => {
        const saltValue = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, saltValue)
    };
    verifyPassword = async (bodyPassword, dbPassword) => {
        return await bcrypt.compare(bodyPassword, dbPassword);
    };
    generateSignatue = async (data) => {
        return JWT.sign(data, process.env.SECERT_KEY, {
            expiresIn: process.env.JWT_ExpiresTime || "24h"
        })
    };
    verifySignature = async (token) => {
        return JWT.verify(token, process.env.SECERT_KEY);
    };
    isTokenExpires = async (token) => {
        const payloadBase64 = token.split(".")[1];
        const decodeJson = Buffer.from(payloadBase64, "base64").toString();
        const decoded = JSON.parse(decodeJson);
        const exp = decoded.exp;
        const expired = Date.now() >= exp*1000;
        return expired;
    }
};

module.exports = new CommonHelper();