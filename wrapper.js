const { app, BrowserWindow, ipcMain } = require("electron");
const { join: joinpath } = require("node:path");
const settings = require("electron-settings");

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
        height: settings.hasSync("winSize.height") ? settings.getSync("winSize.height") : 800,
        width: settings.hasSync("winSize.width") ? settings.getSync("winSize.width") : 1480,
        minWidth: 1300,
        minHeight: 400,
        x: settings.hasSync("winPos.x") ? settings.getSync("winPos.x") : 28,
        y: settings.hasSync("winPos.y") ? settings.getSync("winPos.y") : 12,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: joinpath(__dirname, "preload.js"),
            devTools: false,
            spellcheck: false
        },
        show: false
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

    win.once("ready-to-show", () => {
        if(settings.hasSync("maximized") && settings.getSync("maximized")) win.maximize();

        win.show()
    })

    win.on("resized", () => {
        const size = win.getSize();
        settings.setSync("winSize", {
            width: size[0],
            height: size[1]
        })
    })

    win.on("moved", () => {
        const pos = win.getPosition();
        settings.setSync("winPos", {
            x: pos[0],
            y: pos[1]
        })
    })

    win.on("maximize", () => {
        settings.setSync({maximized: true})
    })

    win.on("unmaximize", () => {
        settings.setSync({maximized: false})
    })

    return win;
}

app.whenReady().then(() => {
    window = createWindow()
    window.loadFile("index.html")
})