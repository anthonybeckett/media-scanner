import MediaApplicationInterface from "./Interfaces/MediaApplicationInterface.js";
import Serial from "./Serial.js";
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class MediaPlayer implements MediaApplicationInterface
{
    _serial: Serial;

    constructor(serial: Serial)
    {
        this._serial = serial;
    }

    run(): void
    {
        this._serial.sendMessage("Running media player");
        // Implement code to update every 2 seconds
    }
}