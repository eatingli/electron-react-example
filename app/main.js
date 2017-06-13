const electron = require('electron')

const app = electron.app
const globalShortcut = electron.globalShortcut
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1000, height: 700 })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './main_window.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}


app.on('ready', () => {
    globalShortcut.register('Escape', function () {
        app.quit();
    })

    createWindow();
})

app.on('will-quit', function () {
    globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})