import MediaApplicationInterface from "./Interfaces/MediaApplicationInterface.js";
import Serial from "./Serial.js";
import { autoInjectable } from 'tsyringe';
import { exec } from "child_process";
import { __dirname } from "./Helpers/Directory.js";

interface ExecException extends Error {
    cmd?: string | undefined;
    killed?: boolean | undefined;
    code?: number | undefined;
    signal?: NodeJS.Signals | undefined;
}

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
        setInterval(() => {
            exec(__dirname + "\\..\\..\\..\\Bin\\WinRtTest2.exe", (error: ExecException | null, stdout: string, stderr: string): void => {
                // To-do: Parse JSON before sending to device

                console.log(stdout);
                console.log(error);
                console.log(stderr);
                //this._serial.sendMessage(stdout);
            });
        }, 1000);
        
        // Implement code to update every 2 seconds
    }
}