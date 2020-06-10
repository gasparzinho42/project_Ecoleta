const express = require("express")
const server = express()

//pegar banco de dados
const db = require("./database/db")

//configirar pasta publica
server.use(express.static("public"))

//permitir o uso do body
server.use(express.urlencoded({ extend: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar os caminhos da minha aplicação
//página inicial
//req: requisicao
//res: resposta
server.get("/", (req, res) =>{
    return res.render("index.html")
})
server.get("/create-point", (req, res) =>{
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    //inserir dados na tabela

    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        number,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true})
    }
    
    db.run(query, values, afterInsertData)


    
})

server.get("/searchResult", (req, res) =>{
    const search = req.query
    console.log("searchResult",search.state," cidade", search.city)
    //consultar dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search.city}%' AND state LIKE '%${search.state}%' `, function(err, rows) {
        if(err){
            return console.log(err)
        }
        const tamanho = rows.length
        console.log("resultado: ", rows)
        return res.render("searchResult.html", { places: rows, tamanho: tamanho})
    },)
})

//ligar o servidor
server.listen(3000)