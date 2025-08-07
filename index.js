import express from 'express'
import fs from 'fs/promises'
import url from 'url'
import path from 'path'
import 'dotenv/config'
import router from './routes/index.js'

const PORT = process.env.PORT || 4000
const app = express()
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'index.html'))
    res.setHeader('Content-Type', 'text/html')
    res.send(data)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
})

app.get('/about', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'about.html'))
    res.setHeader('Content-Type', 'text/html')
    res.send(data)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
})

app.get('/contact-me', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'contact-me.html'))
    res.setHeader('Content-Type', 'text/html')
    res.send(data)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
})

app.use(express.static(__dirname))

app.use(async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '404.html'))
    res.status(404).setHeader('Content-Type', 'text/html').send(data)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT)
