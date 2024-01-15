import ytdl from "ytdl-core"
import fs from "fs"

export const download = videoID =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoID
    console.log("Realizando o download do video:", videoID)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on(
        // menor qualidade de audio pra n ficar pesado, mas a IA vai entender
        "info",
        info => {
          const seconds = info.formats[0].approxDurationMs / 1000 // devolve a duracao do video em segundos (ta em ms mas converte dividindo por 1000)

          if (seconds > 60) {
            throw new Error("A duração desse vídeo é maior do que 60 segundos.")
          }
        }
      )
      .on("end", () => {
        console.log("Download do video finalizado.")
        resolve()
      })
      .on("error", error => {
        console.log(
          "Não foi possível fazer o download do vídeo. Detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4")) // joga o video na pasta tmp
  })
