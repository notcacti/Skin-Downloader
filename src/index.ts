import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import path from "path";
import fs from "fs";
import { getMinecraftSkin } from "./getSkin.js";

let mainWindow: BrowserWindow | null;

const appDataPath = app.getPath("userData");
const prefFilePath = path.join(appDataPath, "preferences.json");

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 845,
        height: 425,
        title: "Cacti's Skin Downloader",
        autoHideMenuBar: true,
        fullscreen: false,
        icon: path.join(process.cwd(), "assets", "icon.ico"),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            devTools: false,
            preload: path.join(process.cwd(), "dist/preload.cjs"),
        },
    });

    Menu.setApplicationMenu(null);

    mainWindow
        .loadFile(path.join(process.cwd(), "wwwroot", "index.html"))
        .catch((err) => {
            console.error("Failed to load the application: ", err);
        });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

ipcMain.on("save-path", async (e) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
    });

    const preferences = {
        //@ts-ignore
        savePath: result.filePaths[0],
    };

    fs.writeFile(prefFilePath, JSON.stringify(preferences), (err) => {
        if (err) console.error("Error writing preferences file: ", err);
    });
});

const readPreferences = () => {
    try {
        const data = fs.readFileSync(prefFilePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading preferences file: ", err);
        return null;
    }
};

ipcMain.on("get-skin", async (event, data) => {
    const preferences = readPreferences();
    // @ts-ignore
    const savePath = preferences.savePath;

    try {
        const res = await getMinecraftSkin(data.username);
        console.log(path.join(savePath, `${data.fileName}.png`));
        fs.writeFileSync(path.join(savePath, `${data.fileName}.png`), res);
        event.sender.send("get-skin", true);
    } catch (e) {
        console.error(e);
        event.sender.send("get-skin", false);
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
