const UserController = require("../controllers/UserController");
const express = require("express");

const router = express.Router();

router.get("/usuarios", UserController.list);
router.get("/usuarios/:id", UserController.getById);
router.post("/usuarios", UserController.create);
router.put("/usuarios/:id", UserController.update);
router.delete("/usuarios/:id", UserController.delete);

module.exports = router;