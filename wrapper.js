const { app, BrowserWindow, ipcMain } = require("electron");
const { join: joinpath } = require("node:path")

let window;
const locked = app.requestSingleInstanceLock();

if(!locked){
    app.quit()
}else {
    app.on("second-instance", () => {
        if(window){
            if(window.isMinimized()) window.restore();
            window.focus()
        }
    })
}

function createWindow() {
    const win = new BrowserWindow({
        height: 800,
        width: 1480,
        minWidth: 1300,
        minHeight: 400,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: joinpath(__dirname, "preload.js")
        }
    })

    ipcMain.on("minimize", () => {
        win.minimize()
    })

    ipcMain.on("maximize", () => {
        win.isMaximized() ? win.unmaximize() : win.maximize()
    })

    ipcMain.on("exit", () => {
        app.quit()
    })

    return win;
}

app.whenReady().then(() => {
    window = createWindow()
    window.loadFile("index.html")
})