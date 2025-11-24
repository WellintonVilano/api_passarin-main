import * as produtoservice from '../services/produtoServices.js'
import joi from 'joi'

export const produtoCreateSchema = joi.object({
    idProduto: joi.string().required(),
    nome: joi.string().max(80).allow(''),
    descricao: joi.string().max(255).allow(''),
    precoUnitario: joi.string().allow(''),
    idCategoria: joi.string().required(),
})

export const produtoUpdateSchema = joi.object({
    idProduto: joi.string(),
    nome: joi.string().max(80).allow(''),
    descricao: joi.string().max(255).allow(''),
    precoUnitario: joi.string().allow(''),
    idCategoria: joi.string(),
}).min(1);

export const listarProduto = async (req,res) => {
    try {
        const produto = await produtoservice.findAll()
        res.status(200).json(produto)
    } catch (err) {
        console.error('Erro ao buscar produto',err)
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}

export const listaridProduto = async (req,res) => {
    try {
        const {idProduto} = req.params
        const produto = await produtoservice.findByidProduto(idProduto)
        if (!produto) {
            return res.status(404).json({error: 'Produto não encontrado'})
        }
        res.status(200).json(produto)
    } catch (err) {
        console.error('Error ao buscar produto',err)
        res.status(500).json ({error: 'Erro interno do servidor'})
    }
}

export const adicionarProduto = async (req,res) => {
    try {
        const novoProduto = await produtoservice.create(req.body)
        res.status(201).json({message: 'Produto adicionado com sucesso', data: novoProduto})
    } catch (err) {
        console.error ('Erro ao adicionar produto',err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json ({error: 'idProduto ja cadastrado'})
        }
        res.status(500).json({error: 'Erro ao adicionar produto'})
    }
}

export const deletarProduto = async (req,res) => {
    try {
        const {idProduto} = req.params
        const deleted = await produtoservice.remove(idProduto)
        if(!deleted) {
            return res.status(404).json({error: 'Produto não encontrado'})
        }
        res.status(200).json({message: 'Produto deletado com sucesso'})
    } catch (err) {
        console.error('Erro ao deletar produto',err)
    }
}

export const atualizarProduto =  async (req,res) => {
    try {
        const {idProduto} = req.params
        const updated = await produtoservice.create(req.body)
        if (!updated) {
            return res.status(404).json({error: 'Erro ao atualizar o produto, não encontrado.'})
        }
        res.status(202).json({message: 'Produto atualizado com sucesso'}) 
    } catch (err) {
        console.error('Erro ao atualizar o produto, deu pau no server')
        res.status(500).json({error: 'Erro ao atualizar produto'})
    }
}