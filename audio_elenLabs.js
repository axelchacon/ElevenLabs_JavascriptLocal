import { ElevenLabsClient } from "elevenlabs";
import { config } from "dotenv";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

config(); // Carga las variables de entorno desde el archivo .env

const elevenlabs = new ElevenLabsClient({
	apiKey: process.env.API_KEY_ELEVENLABS, // Defaults to process.env.ELEVENLABS_API_KEY
});

const pipelineAsync = promisify(pipeline);

async function generateAndSaveAudio() {
	try {
		const audio = await elevenlabs.generate({
			voice: "Adam",
			text: "Hola amigo Juan Pérez",
			model_id: "eleven_multilingual_v2",
		});

		// Guardar el archivo de audio
		await pipelineAsync(audio, fs.createWriteStream("my-file.mp3"));
		console.log(
			"El archivo de audio se ha guardado exitosamente como my-file.mp3"
		);
	} catch (error) {
		console.error("Error al generar o guardar el archivo de audio:", error);
	}
}

generateAndSaveAudio();
