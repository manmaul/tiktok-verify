import cron from "node-cron";
import { download30 } from "./src/gatherVideos.js";
import { authDrive, ensureFolderExists, uploadFileToDrive } from "./src/googleDrive.js";
import fs from "fs/promises";
import path from "path";

const DRIVE_FOLDER_NAME = "Publica Hoy";

async function runOnce() {
  console.log("🚀 Inicio tarea Publica Hoy");

  // 1) obtener lista de archivos descargados localmente (download30 devuelve array de paths)
  const downloaded = await download30(); // implementado en gatherVideos.js

  console.log("Archivos descargados:", downloaded.length);

  // 2) subir a Drive
  const drive = await authDrive();
  const folderId = await ensureFolderExists(drive, DRIVE_FOLDER_NAME);

  for (const fpath of downloaded) {
    try {
      console.log("Subiendo:", fpath);
      await uploadFileToDrive(drive, folderId, fpath);
      // borrar local para ahorrar espacio
      await fs.unlink(fpath).catch(()=>{});
    } catch (e) {
      console.error("Error subiendo", fpath, e.message || e);
    }
  }

  console.log("🎉 Tarea completada.");
}

if (process.env.RUN_NOW === "1") {
  runOnce().catch(console.error);
}

// Cron: 17:30 UTC = 18:30 CET (ajusta si necesario)
cron.schedule("30 17 * * *", () => {
  console.log("Cron lanzado...");
  runOnce().catch(console.error);
});
