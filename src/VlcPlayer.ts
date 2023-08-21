import MediaApplicationInterface from "./Interfaces/MediaApplicationInterface.js";
import Serial from "./Serial.js";
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class VlcPlayer implements MediaApplicationInterface
{
    _serial: Serial;

    constructor(serial: Serial)
    {
        this._serial = serial;
    }

    run(): void
    {
        this._serial.sendMessage("Running VLC Player");
        // Implement code to update every 2 seconds
    }
}