import mysql from 'mysql2/promise'

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async () => {

    try {
    const connection =  await db.getConnection();
    console.log(`Conexão com o banco de dados feita com sucesso`)
    connection.release()
} catch (err) {
    console.log('Erro ao conectar ao banco de dados:' ,err)
}

}


export default db 