import express from "express"
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando, tente /conta ou /transacao!')
})

app.post('/conta', (req, res) => {

  const { conta_id, valor } = req.body

    res.status(201).json({
      conta_id: 1234,
      saldo: 189.70
    })
  })


app.get('/conta/:id', (req, res) => {
  const id = req.params.id 
  if (id != 1234) {
    res.status(404).send(`Erro, conta de id ${id} não encontrada.`)
  } else {
    res.status(200).json(
      {
        conta_id: 1234, 
        saldo: 200
      }
    )
  }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
