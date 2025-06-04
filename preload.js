const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("winControl", {
    minimize: () => ipcRenderer.send("minimize"),
    maximize: () => ipcRenderer.send("maximize"),
    exit: () => ipcRenderer.send("exit")
})