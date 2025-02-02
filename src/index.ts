import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import fs from "fs";

let mainWindow: BrowserWindow | null;

// const appDataPath = app.getPath("userData");
const appDataPath = path.join(process.cwd(), ".appdata/");
const prefFilePath = path.join(appDataPath, "preferences.json");

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 845,
        height: 425,
        title: "Cacti's Skin Downloader",
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(process.cwd(), "dist/preload.cjs"),
            devTools: true,
        },
    });

    Menu.setApplicationMenu(null);

    mainWindow
        .loadFile(path.join(process.cwd(), "wwwroot", "index.html"))
        .catch((err) => {
            console.error("Failed to load the application: ", err);
        });

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

ipcMain.on("save-path", (event, savePath) => {
    const preferences = {
        savePath: savePath,
    };

    fs.writeFile(prefFilePath, JSON.stringify(preferences, null, 2), (err) => {
        if (err) console.error("Error writing preferences file: ", err);
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
