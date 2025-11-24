import * as itemservice from '../services/itemServices.js'
import joi from 'joi'

export const itemCreateSchema = joi.object({
idItem: joi.string().required(),
descricao: joi.string().max(50).allow(''),
idProduto: joi.string().required(),
idPedido: joi.string().required(),
})

export const itemUpdateSchema = joi.object({
idItem: joi.string(),
descricao: joi.string().max(50).allow(''),
idProduto: joi.string(),
idPedido: joi.string(),
}).min(1);

export const listarItem = async (req,res) => {
    try {
        const item = await itemservice.findAll()
        res.status(200).json(item)
    } catch (err) {
        console.error('Erro ao buscar item',err)
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}

export const adicionarItem = async (req,res) => {
    try {
        const novoItem = await itemservice.create(req.body)
        res.status(201).json({message: 'Item adicionado com sucesso', data: novoItem})
    } catch (err) {
        console.error ('Erro ao adicionar item',err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json ({error: 'Item ja cadastrado'})
        }
        res.status(500).json({error: 'Erro ao adicionar item'})
    }
}

export const deletarItem = async (req,res) => {
    try {
        const {item} = req.params
        const deleted = await itemservice.remove(item)
        if(!deleted) {
            return res.status(404).json({error: 'Item não encontrado'})
        }
        res.status(200).json({message: 'Item deletado com sucesso'})
    } catch (err) {
        console.error('Erro ao deletar item',err)
    }
}

export const atualizarItem =  async (req,res) => {
    try {
        const {item} = req.params
        const updated = await itemservice.create(req.body, item)
        if (!updated) {
            return res.status(404).json({error: 'Erro ao atualizar o item, não encontrado.'})
        }
        res.status(202).json({message: 'Item atualizado com sucesso'}) 
    } catch (err) {
        console.error('Erro ao atualizar o item, deu pau no server')
        res.status(500).json({error: 'Erro ao atualizar item'})
    }
}

