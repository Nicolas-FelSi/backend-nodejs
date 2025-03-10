const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddlewares");
const express = require("express");

const router = express.Router();

router.post("/login", UserController.login);
router.get("/usuarios", authMiddleware, UserController.list);
router.get("/usuarios/:id", authMiddleware, UserController.getById);
router.post("/usuarios", authMiddleware, UserController.create);
router.put("/usuarios/:id", authMiddleware, UserController.update);
router.delete("/usuarios/:id", authMiddleware, UserController.delete);

module.exports = router;