const Electron = require('electron')
const { app, globalShortcut, BrowserWindow } = Electron
const DEV_MODE = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development';

const path = require('path')
const url = require('url')

let mainWindow

/**
 * Build up development tool
 */
function devTool() {

    // devtron
    require('devtron').install()

    // require
    const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS
    } = require('electron-devtools-installer');

    // REACT_DEVELOPER_TOOLS
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    // REDUX_DEVTOOLS
    installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    console.log(process.env.NODE_ENV);
}

/**
 * Setup development shortcut
 */
function devShortcut() {

    // Esc -> Exit App
    globalShortcut.register('Escape', () =>
        app.quit()
    )

    // Ctrl + R -> Reload
    globalShortcut.register('Control+R', () =>
        mainWindow.webContents.reload()
    )

    // Ctrl + D -> Toggle Development Tool contents.toggleDevTools()
    globalShortcut.register('Control+D', () =>
        mainWindow.webContents.toggleDevTools()
    )
}

/**
 * Build up main window
 */
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1000, height: 700 })

    // Load app index page.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './main_window.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // Open the DevTools.
    if (DEV_MODE) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
        app.quit()
    })
}

/**
 * 
 */
app.on('ready', () => {

    // Development option
    if (DEV_MODE) {
        devShortcut();
        devTool();
        console.log('Development Mode');
    }

    // 
    createWindow();

})

/**
 * Cencel short before quit
 */
app.on('will-quit', function () {
    globalShortcut.unregisterAll()
})

/**
 * Quit when all windows are closed.
 */
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/**
 * 
 */
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})