import * as clienteservice from '../services/clienteServices.js'
import joi from 'joi'

export const clienteCreateSchema = joi.object({
email: joi.string().max(50).required().email(),
nome: joi.string().max(50).required(),
telefone: joi.string().length(11).required(),
endereco: joi.string().max(50).required(),
cep: joi.string().length(8).required(),
cidade: joi.string().max(50).required(),
bairro: joi.string().max(50).required(),
complemento: joi.string().max(100).allow(''),
senha: joi.string().length(255).required(), 
})

export const clienteUpdateSchema = joi.object({
    email: joi.string().email().max(50),
    nome: joi.string().max(50),
    telefone: joi.string().length(11),
    endereco: joi.string().max(50),
    cep: joi.string().length(8),
    cidade: joi.string().max(50),
    bairro: joi.string().max(50),
    complemento: joi.string().max(100).allow(''),
    senha: joi.string().length(255),
}).min(1);

export const listarClientes = async (req,res) => {
    try {
        const clientes = await clienteservice.findAll()
        res.status(200).json(clientes)
    } catch (err) {
        console.error('Erro ao buscar cleintes',err)
        res.status(500).json({error: 'Erro interno do Servidor'})
    }
}

export const listarClientesCpf = async (req,res) => {
    try {
        const {cpf} = req.params
        const cliente = await clienteservice.findByCpf(cpf)
        if (!cliente) {
            return res.status(404).json({error: 'Cliente não encontrado'})
        }
        res.status(200).json(cliente)
    } catch (err) {
        console.error('Error ao buscar cliente',err)
        res.status(500).json ({error: 'Erro interno do servidor'})
    }
}

export const adicionarCliente = async (req,res) => {
    try {
        const novoCliente = await clienteservice.create(req.body)
        res.status(201).json({message: 'Cliente adicionado com sucesso', data: novoCliente})
    } catch (err) {
        console.error ('Erro ao adicionar cliente',err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json ({error: 'CPF ja cadastrado'})
        }
        res.status(500).json({error: 'Erro ao adicionar cliente'})
    }
}

export const deletarCliente = async (req,res) => {
    try {
        const {cpf} = req.params
        const deleted = await clienteservice.remove(cpf)
        if(!deleted) {
            return res.status(404).json({error: 'Cliente não encontrado'})
        }
        res.status(200).json({message: 'Cliente deletado com sucesso'})
    } catch (err) {
        console.error('Erro ao deletar cliente',err)
    }
}

export const atualizarCliente =  async (req,res) => {
    try {
        const {cpf} = req.params
        const updated = await clienteservice.create(req.body)
        if (!updated) {
            return res.status(404).json({error: 'Erro ao atualizar o cliente, não encontrado.'})
        }
        res.status(202).json({message: 'Cliente atualizado com sucesso'}) 
    } catch (err) {
        console.error('Erro ao atualizar o cliente, deu pau no server')
        res.status(500).json({error: 'Erro ao atualizar cliente'})
    }
}