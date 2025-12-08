const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
