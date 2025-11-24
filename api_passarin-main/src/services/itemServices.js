import db from  '../db/db.js'

export const findAll = async (minValor, maxValor, idCategoria, idProduto, idItem) => {
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
        conditions.push('idCategoria = ?');
        values.push(idCategoria)
    }
    if (idItem) {
        conditions.push('idItem = ?');
        values.push(idItem)
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    const [rows] = await db.query(sql, values);
    return rows
}

export const create = async (itemData) => {

    const novoItem = itemData

    await db.query('INSERT INTO item SET ?', novoItem);
    return novoItem
};

export const update = async (idItem, itemData) => {
    const [result] = await db.query('UPDATE item SET ? WHERE idItem = ?', [itemData, idItem]);
    return result.affectedRows > 0;
};

export const remove = async (idItem) => {
    const [result] = await db.query('DELET FROM item WHERE idItem = ?', [idItem]);
    return result.affectedRows > 0;
};
