const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();

class Database {
    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        })
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Banco de dados conectado.");
        } catch (error) {
            console.log("Erro ao conectar com o banco: " + error.stack);
        }
    }

    async query(sql, params=[]) {
        try {
            const result = await this.client.query(sql, params);
            return result.rows;
        } catch (error) {
            console.log("Erro na consulta SQL: " + error.stack);     
            throw error;      
        }
    }

    async close() {
        await this.client.end();
        console.log("Conexão com o banco encerrada.");
    }
}

module.exports = new Database();