import  express  from "express"
import db from "./database/db.js"
import nunjucks from 'nunjucks'
import routes from "./routes.js"

const server = express()



//configurar pasta public
server.use(express.static("public"))

// habilitar o uso do req.body da nossa aplicação
server.use(express.urlencoded({extended: true}))

//utilizando template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


//configurar caminhos da minha aplicação
//pagina inicial
//req: é uma requisição 
//res: é uma resposta
server.use(routes)



// ligar o servidor
server.listen(3000, () => console.log('Active on port 3000'))