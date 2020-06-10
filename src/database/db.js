const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira realizar operacões no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de dados para realizar nossas operacões
// db.serialize(() => {
//     //criar um tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             number TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     //inserir dados na tabela

//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         number,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `
//     const values = ["https://images.unsplash.com/photo-1582408921715-18e7806365c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "N° 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis e papelão"]
//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }

//         console.log("cadastrado com sucesso")
//         console.log(this)
//     }
    
//     db.run(query, values, afterInsertData)

//     //consultar dados da tabela
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if(err){
//     //         return console.log(err)
//     //     }
//     //     console.log('aqui estão seus registros')
//     //     console.log(rows)
//     // })
//     //deletar dados da tabela

//     db.run(`DELETE FROM places WHERE id = ?`,[4],function() {
//         if(err){
//             return console.log(err)
//         }

//         console.log('registro deletado com sucesso')
//     })
// })