import { server } from "./server.js"
const form = document.querySelector("#form") // seleciona o form
const input = document.querySelector("#url") // seleciona o input da url
const content = document.querySelector("#content") // seleciona o p

form.addEventListener("submit", async event => {
  // o async vai servir para colocar o server.get para rodar apos um momento
  event.preventDefault() // nao atualiza a pagina apos o submit da pagina (que eh uma configuracao padrao)
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    // ! eh negacao
    return (content.textContent = "Esse video nao parece ser um short.")
  }

  const [_, params] = videoURL.split("/shorts/") // corta o link em um array e tira a parte escrito /shorts/, pega soh a segunda posicao
  const [videoID] = params.split("?si") // corta o link para separar o id em links compartilhados que possuem o ?si

  content.textContent = "Obtendo o texto do audio..."

  const transcription = await server.get("/summary/" + videoID) // so vai rodar "await" quando

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result
  }) 

  content.textContent = summary.data.result
  content.classList.remove("placeholder") // apos o texto ser transcrito, remove a class css de placeholder no ppara que o usuario consiga copiar o texto
})
