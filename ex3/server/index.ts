import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.status(200).send({ret:"ok"})
})

app.listen(80, () => {
  console.info('API listening')
});