import express from 'express'
import * as produtoController from '../controllers/produtoControler.js'
import validate from '../middlewares/validate.js'
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoControler.js'

// import authMiddleware from  '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', validate (produtoCreateSchema), produtoController.adicionarProduto);

router.get('/', produtoController.listarProduto);
router.get('/:idProduto' ,produtoController.listaridProduto);

router.put('/:idProduto' , validate(produtoUpdateSchema), produtoController.atualizarProduto);
router.delete('/:idProduto', produtoController.deletarProduto);

export default router