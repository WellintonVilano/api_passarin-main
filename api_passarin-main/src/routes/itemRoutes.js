import express from 'express'
import * as itemController from '../controllers/itemController.js'
import validate from '../middlewares/validate.js'
import { itemCreateSchema, itemUpdateSchema } from '../controllers/itemController.js'

// import authMiddleware from  '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', validate (itemCreateSchema), itemController.adicionarItem);

router.get('/', itemController.listarItem);
router.get('/:item', itemController.listarItem);

router.put('/:item', validate(itemUpdateSchema), itemController.atualizarItem);
router.delete('/:item', itemController.deletarItem);

export default router