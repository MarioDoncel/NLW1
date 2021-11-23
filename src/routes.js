import  express from "express"
import util from 'util'
import db from "./database/db.js"

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

const routes = express.Router()


routes.get("/", (req, res) => {
    return res.render("index.html") 
})

routes.get("/create-point", (req, res) => {
    return res.render("create-point.html") 
})

routes.post("/save-point",async (req, res) => {
    const {image,name,address,address2,state,city,items} = req.body
    
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ]
    
    try {
        await db.run(query, values)
    } catch (error) {
        console.log(err)
        return res.send("Erro no cadastro!")
    }
    
    return res.render("create-point.html", {saved: true})

})


routes.get("/search-results", async (req, res) => {
    const search = req.query.search
    if(search == "") res.render("search-results.html", {total:0}) 
   
    //pegar os addos do banco de dodos
    try {
        const places = await db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`)
        const total = places.length
        
        return res.render("search-results.html", {places, total}) 
    } catch (error) {
        console.log(error)
        return res.send('Database error')
    }
    
})

export default routes

    


