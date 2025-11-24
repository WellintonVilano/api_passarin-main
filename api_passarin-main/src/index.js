import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import clienteRoutes from './routes/clienteRoutes.js'

import db from './db/db.js'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const corsOptions =  {
    origin: ['http://localhost:5555', 'https://meudominio.com'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    Credentials: true,
};

const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(_dirname, '..', 'public')))

app.get ('/', (req,res) => {
    res.sendFile(path.join(_dirname, '..', 'pages', 'home.html'))
})

const apiPrefix = '/api'
app.use(`${apiPrefix}/cliente`, clienteRoutes)

app.use ((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado no servidor')
})

const PORT  = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log (`Servidor rodando na porta ${PORT}`)
})