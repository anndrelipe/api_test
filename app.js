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
  const { forma_pagamento, conta_id, valor} = req.body

  if (!forma_pagamento || !conta_id || !valor) {
    res.status(404).send('Bad Request! Todos os parametros são obrigatórios! ')
  } 

    res.status(201).json({
      conta_id: 1234, 
      saldo: 189.70
    })
  }
)

app.post('/conta', (req, res) => {

  const { conta_id, valor } = req.body
  
    res.status(201).json({
      conta_id: 1234,
      saldo: 189.70
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
