import { app, BrowserWindow, Menu } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 845,
        height: 425,
        title: "Cacti's Skin Downloader",
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
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

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
