const database = require("../database/connection");

class UserModel {
    async getAllUsers() {
        return await database.query("SELECT * FROM usuarios");
    }

    async getUserById(id) {
        return await database.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    }

    async createUser(name, email, password) {
        return await database.query("INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);
    }

    async updateUser(id, name, email, password) {
        return await database.query("UPDATE usuarios SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
    }

    async deleteUser(id) {
        return await database.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
    }
}

module.exports = new UserModel();