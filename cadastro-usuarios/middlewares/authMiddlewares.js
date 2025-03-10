const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(400).json({ error: "Token não fornecido." });
    }

    try {
        const tokenWithoutBearer = token.split(" ")[1];

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(400).json({ error: "Token inválido ou expirado." });
    }
}

module.exports = authMiddleware;