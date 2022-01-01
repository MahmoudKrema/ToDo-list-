const { Menu } = require('electron');
const electron = require('electron');
const { app, BrowserWindow, ipcMain, menu } = electron;
let mainWindow, addToDoWindow;

app.on('ready', () => {
    console.log(`${__dirname}\\index.html`);
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
          
        },
      });
    mainWindow.loadURL(`file://${__dirname}\\index.html`); 

    const mainMenu = Menu.buildFromTemplate(barMenu);
    Menu.setApplicationMenu(mainMenu);
    
});

function createAddWindow() {
  addToDoWindow = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      frame: false
      
    },
  });
addToDoWindow.loadURL(`file://${__dirname}\\addToDo.html`); 

}

const barMenu = [{
        label: 'File',
        submenu: [
            {
              label: 'New ToDo',
              accelerator: process.platform === 'drawin' ? 'Command+N' : 'Ctrl+K',
              click() {
                createAddWindow();
                
              }
            },

            {
              label: 'Clear the list',
              accelerator: process.platform === 'drawin' ? 'Command+T' : 'Ctrl+T',
              click() {
                mainWindow.webContents.send('Clear:Sent');
                
              }
            },
            
            {
              label: 'Quit',
              accelerator: process.platform === 'drawin' ? 'Command+Q' : 'Ctrl+Q',
              click() {
                app.quit();
              }
            },

            {
              role: 'toggleDevTools'
            }
        ]
    }];

ipcMain.on('ToDo:Submit', (event, theToDo) => {   

  console.log(theToDo);
    mainWindow.webContents.send('ToDo:Sent', theToDo);
    addToDoWindow.close();

});

