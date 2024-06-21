import 'dotenv/config'
import express from "express"
import mysql from 'mysql'

const app = express()
const port = 8000

app.use(express.json())

var db = mysql.createConnection({
  database : process.env.DB_NAME,
  port     : process.env.DB_BASE_PORT,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_ROOT_PASSWORD
});


db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});















app.get('/', (req, res) => {
  res.send('API funcionando, tente /conta ou /transacao!')
})




















app.post('/transacao', (req, res) => {
  const { forma_pagamento, conta_id, valor } = req.body

  const query1 = `SELECT saldo FROM conta WHERE conta_id = ${conta_id};`;
  
  db.query(query1, (err, value) => {
    if (err) {
      throw err
    }

    let taxa
    if (forma_pagamento.toUpperCase() === "D") {
      taxa = 0.03
    } else if (forma_pagamento.toUpperCase() === "C") {
      taxa = 0.05
    }

    const result = value[0].saldo

    db.query(`UPDATE conta SET saldo = ${result - (valor + (valor * taxa))} WHERE conta_id = ${conta_id}`, function (err) {
      if (err) {
        throw err
      } 
    })
    
  })

  const query3 = `INSERT INTO hist_transacao (forma_pagamento, conta_id, valor) values ("${forma_pagamento}", ${conta_id}, ${valor});`

  db.query(query3, (err) => {
    if (err) {
      throw err
    } 
    res.status(201).json({mensagem : "Transação realizada, valor sujeito a taxação mediante à forma de pagamento."})
  })

  if (!forma_pagamento || !conta_id || !valor) {
    res.status(404).send('Bad Request! Todos os parametros são obrigatórios! ')
  }   
  }
)

















app.post('/conta', (req, res) => {

  const { saldo } = req.body;
  const query = `INSERT INTO conta (saldo) values (${saldo});`;

  if (!saldo) {
    res.status(400).json({mensagem : "Bad request, você precisa definir um saldo inicial para a conta."})
    return
  } 

  db.query(query, function (err) {
    if (err) {
      res.status(500).json({mensagem : "Algo de errado aconteceu. Não foi possível cadastrar conta."})
      return
    }
    res.status(201).json({mensagem : "Sucesso conta cadastrada."})
  })
})


app.get('/conta/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM conta WHERE conta_id = ${id}`;

  db.query(query, function (err, result) {
    if (err || result.length === 0) {
      res.status(404).json({mensagem : "Algo deu errado :( Verifique se o id existe!"})
      return
    }
    res.status(200).json(result[0])
  })

})
















  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
