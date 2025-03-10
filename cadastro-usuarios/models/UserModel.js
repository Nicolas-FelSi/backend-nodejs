const database = require("../database/connection");
const bcrypt = require("bcrypt");

class UserModel {
    async getAllUsers() {
        try {
            return await database.query("SELECT * FROM usuarios");
        } catch (error) {
            console.log("Erro ao buscar usuários: " + error.stack);
            throw new Error("Erro ao buscar usuários.");
        } finally {
            await database.close();
        }
    }

    async getUserById(id) {
        try {
            return await database.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        } catch (error) {
            console.log(`Erro ao buscar usuário com ID ${id}: ` + error.stack);
            throw new Error("Erro ao buscar usuário.");            
        } finally {
            await database.close();
        }
    }

    async getUserByEmail(email) {
        try {
            return await database.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        } catch (error) {
            console.log(`Erro ao buscar usuário com e-mail ${email}: ` + error.stack);
            throw new Error("Erro ao buscar usuário por e-mail.");       
        } finally {
            await database.close();
        }
    }

    async createUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            return await database.query("INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
        } catch (error) {
            console.log("Erro ao criar usuário: " + error.stack);
            throw new Error("Erro ao criar usuário.");    
        } finally {
            await database.close();
        }
    }

    async updateUser(id, name, email, password) {
        try {
            return await database.query("UPDATE usuarios SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
        } catch (error) {
            console.log(`Erro ao atualizar usuário com ID ${id}: ` + error.stack);
            throw new Error("Erro ao atualizar usuário.");                       
        } finally {
            await database.close();
        }
    }

    async deleteUser(id) {
        try {
            return await database.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
        } catch (error) {
            console.log(`Erro ao deletar usuário com ID ${id}: ` + error.stack);
            throw new Error("Erro ao deletar usuário.");           
        } finally {
            await database.close();
        }
    }
}

module.exports = new UserModel();