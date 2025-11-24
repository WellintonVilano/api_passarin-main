import db from  '../db/db.js'

export const findAll = async (minValor, maxValor, idCategoria, idProduto) => {
    let sql = 'SELECT * FROM produto';
    const conditions = [];
    const values = [];
    if (minValor) {
        conditions.push('valor >= ?');
        values.push(minValor);
    }
    if (maxValor) {
        conditions.push('valor <= ?');
        values.push(maxValor);
    }
    if (idProduto) {
        conditions.push('idProduto = ?');
        values.push(idProduto);
    }
    if (idCategoria) {
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.query(sql, values);
    return rows
}

export const create = async (produtoData) => {

    const novoProduto = produtoData

    await db.query('INSERT INTO produto SET ?', novoProduto);
    return novoProduto
};

export const update = async (idProduto, produtoData) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [produtoData, idProduto]);
    return result.affectedRows > 0;
};

export const remove = async (idProduto) => {
    const [result] = await db.query('DELET FROM produto WHERE idProduto = ?', [idProduto]);
    return result.affectedRows > 0;
};
