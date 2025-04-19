import http from 'http'
import fs from 'fs/promises'
import url from 'url'
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = http.createServer(async (req, res) => {
  let filePath
  let contentType = 'text/html'

  try {
    if (req.url === '/') {
      filePath = path.join(__dirname, 'index.html')
    } else if (req.url === '/about') {
      filePath = path.join(__dirname, 'about.html')
    } else if (req.url === '/contact-me') {
      filePath = path.join(__dirname, 'contact-me.html')
    } else if (req.url.endsWith('.css')) {
      filePath = path.join(__dirname, req.url)
      contentType = 'text/css'
    } else {
      filePath = path.join(__dirname, '404.html')
    }

    const data = await fs.readFile(filePath)
    res.setHeader('Content-Type', contentType)
    res.write(data)
    res.end()
  } catch (err) {
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

server.listen(80)
