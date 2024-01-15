import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()
app.use(express.json()) // explica que vai receber conteudo no formato .json
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  try {
    await download(request.params.id) // aguarda o download finalizar para executar o resto
    const audioConverted = await convert()
    const result = await transcribe(audioConverted)

    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333")) // ao abrir o servidor executa a funcao automaticamente que imprimne essa msg
