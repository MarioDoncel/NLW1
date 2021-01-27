const express = require("express")
const server = express()

//pegar o banco de dodos
const db =  require("./database/db")

//configurar pasta public
server.use(express.static("public"))


//utilizando template engine
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

    //pegar os addos do banco de dodos
    db.all(`SELECT * FROM places`, function (err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total}) 
    })

    
})



// ligar o servidor
server.listen(3000)