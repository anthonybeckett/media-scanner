import Application from './Application.js';
import MediaPlayer from './MediaPlayer.js';
import Serial from './Serial.js';
import { autoInjectable } from 'tsyringe';
import VlcPlayer from './VlcPlayer.js';

@autoInjectable()
export default class InitApplication
{
    _application: Application;
    _runningMediaApp: string | null = null;
    _serial: Serial;
    _mediaPlayer: MediaPlayer;
    _vlcPlayer: VlcPlayer;
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
        mediaPlayer: MediaPlayer,
        vlcPlayer: VlcPlayer
    ){
        this._application = application;
        this._serial = serial;
        this._mediaPlayer = mediaPlayer;
        this._vlcPlayer = vlcPlayer;

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
        return new Promise((resolve, reject) => {
            this._supportedApplications.forEach(async (mediaApp) => {
                let isAppRunning = await this._application.isApplicationRunning(mediaApp.name);
                
                if(isAppRunning){
                    this.setRunningMediaApp(mediaApp.name);
                    resolve(true);
                }

                resolve(false);
            });
        });
    }

    async run()
    {
        await this.initialise();

        switch(this.getRunningMediaApp()){
            case 'vlc': {
                this._vlcPlayer.run();
                break;
            }
            case 'Microsoft.Media.Player': {
                this._mediaPlayer.run();
                break;
            }
            default:
                this._serial.sendMessage("No running application");
                setTimeout(() => this.run(), 3000);
        }
    }
}