import Application from './Application.js';
import MediaPlayer from './MediaPlayer.js';
import Serial from './Serial.js';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class InitApplication
{
    _application: Application;
    _runningMediaApp: string | null = null;
    _serial: Serial | null;
    _mediaPlayer: MediaPlayer;
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

    constructor(
        application: Application, 
        serial: Serial,
        mediaPlayer: MediaPlayer
    ){
        this._application = application;
        this._serial = serial;
        this._mediaPlayer = mediaPlayer;

        this._serial.sendMessage("Connecting");
    }

    getRunningMediaApp(): string | null
    {
        return this._runningMediaApp;
    }

    setRunningMediaApp(appName: string): void
    {
        this._runningMediaApp = appName;
    }

    initialise(): Promise<Boolean>
    {
        console.log("Calling initalise");
        return new Promise((resolve, reject) => {
            this._supportedApplications.forEach(async (mediaApp) => {
                let isAppRunning = await this._application.isApplicationRunning(mediaApp.name);
                
                if(isAppRunning){
                    this.setRunningMediaApp(mediaApp.name);
                    resolve(true);
                }
            });
        });
    }

    run(): void
    {
        switch(this.getRunningMediaApp()){
            case 'vlc': {
                console.log("Not implemented VLC player yet");
                break;
            }
            case 'Microsoft.Media.Player': {
                this._mediaPlayer.run();
                break;
            }
            default: {
                console.log("Waiting for connection... Retrying in 3 seconds");
                setTimeout(() => this.run(), 3000);
            }
        }
    }
}