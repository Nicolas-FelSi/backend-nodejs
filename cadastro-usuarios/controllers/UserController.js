const UserModel = require("../models/UserModel");
const UserValidation = require("../utils/UserValidation");
const validationUser = require("../utils/validationFieldsUser");

class UserController {
    async list(req, res) {
        const users = await UserModel.getAllUsers();
        res.json(users);
    }

    async getById(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            res.status(400).json({ error: "Formato de ID incorreto." });
            return;
        }

        const user = await UserModel.getUserById(id);

        if (user.length === 0) {
            res.status(400).json({ error: "Usuário não encontrado." });
            return;
        }

        res.json(user);        
    }

    async create(req, res) {
        const { name, email, password } = req.body;

        const errors = validationUser(name, email, password);

        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }

        await UserModel.createUser(name, email, password);
        res.json({ message: "Usuário registrado com sucesso." });
    }

    async update(req, res) {
        const { name, email, password } = req.body;
        const { id } = req.params;
        const errors = validationUser(name, email, password);

        if (isNaN(id)) {
            res.status(400).json({ error: "Formato de ID incorreto." });
            return;
        }
        
        if (errors.length > 0) {
            res.status(400).json({errors});
            return;
        }
        
        const updatedUser = await UserModel.updateUser(id, name, email, password);

        if (updatedUser.length === 0) {
            res.status(400).json({ error: "Usuário não encontrado." });
            return;
        }

        res.json({ message: "Usuário atualizado com sucesso" });
    }

    async delete(req, res) {
        const { id } = req.params;

        if (isNaN(id)) {
            res.status(400).json({ error: "Formato de ID incorreto." });
            return;
        }

        const deletedUser = await UserModel.deleteUser(id);

        if (deletedUser.length === 0) {
            res.status(400).json({ error: "Usuário não encontrado." });
            return;
        }

        res.json({ message: "Usuário deletado com sucesso" });
    }
}

module.exports = new UserController();