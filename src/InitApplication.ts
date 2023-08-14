import Application from './Application.js';
import Serial from './Serial.js';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class InitApplication{

    //_application: Application | null = null;
    _application: Application;
    _runningMediaApp: string | null = null;
    _serial: Serial | null;
    _supportedApplications = [
        {
            name: 'vlc',
            displayName: 'VLC',
        }, 
        {
            name: 'Microsoft.Media.Player',
            displayName: 'Microsoft Media Player'
        }
    ];

    constructor(application: Application){
        this._application = application;
        this._serial = new Serial('COM5', 9600);

        this._serial.sendMessage("Connecting");
    }

    getRunningMediaApp(){
        return this._runningMediaApp;
    }

    setRunningMediaApp(appName: string){
        this._runningMediaApp = appName;
    }

    initialise(){
        console.log("Calling initalise");
        return new Promise((resolve, reject) => {
            this._supportedApplications.forEach(async (mediaApp) => {
                let isAppRunning = await this._application.isApplicationRunning(mediaApp.name);

                console.log(isAppRunning);
                
                if(isAppRunning){
                    this.setRunningMediaApp(mediaApp.name);
                    resolve(true);
                }
            });
        });
    }
}