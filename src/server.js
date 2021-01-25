const express = require("express")
const server = express()


//configurar pasta public
server.use(express.static("public"))

const nunjucks =  require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


//configurar caminhos da minha aplicação
//pagina inicial
//req: é uma requisição 
//res: é uma resposta
server.get("/", (req, res) => {
    return res.render("index.html") 
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html") 
})

server.get("/search-results", (req, res) => {
    return res.render("search-results.html") 
})



// ligar o servidor
server.listen(3000)