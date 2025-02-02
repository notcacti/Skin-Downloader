const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    sendData: (data) => ipcRenderer.send("save-path", data),
    getSkin64: (username, fileName) =>
        ipcRenderer.send("get-skin", { username, fileName }),
});
