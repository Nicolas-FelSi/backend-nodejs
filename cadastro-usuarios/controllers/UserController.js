const UserModel = require("../models/UserModel");

class UserController {
    async list(req, res) {
        const users = await UserModel.getAllUsers();
        res.json(users);
    }

    async getById(req, res) {
        const user = await UserModel.getUserById(req.params.id);
        res.json(user);        
    }

    async create(req, res) {
        const { name, email, password } = req.body;
        res.json({ message: "Usuário registrado com sucesso." });
        await UserModel.createUser(name, email, password);
    }

    async update(req, res) {
        const { name, email, password } = req.body;
        const { id } = req.params;
        await UserModel.updateUser(id, name, email, password);
        res.json({ message: "Usuário atualizado com sucesso" });
    }

    async delete(req, res) {
        await UserModel.deleteUser(req.params.id);
        res.json({ message: "Usuário deletado com sucesso" });
    }
}

module.exports = new UserController();