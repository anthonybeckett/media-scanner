import { SerialPort } from "serialport";

export default class Serial{

    _comPort: string;
    _bitRate: number;
    _serialPort: SerialPort;

    constructor(comPort: string, bitRate: number){
        this._comPort = comPort;
        this._bitRate = bitRate;

        try{
            this._serialPort = new SerialPort({
                path: comPort,
                baudRate: bitRate
            })
        }catch(e){
            throw new Error("No connected device found.");
        }
    }

    sendMessage(message: string): void
    {
        // To do - add a message parsing check to make sure it's less than 128 bits
        this._serialPort.write(message, function(err){
            if (err) {
                return console.log("Error on write: ", err.message);
            }
            
            console.log(`Sent message: ${message}`);
        });
    }
}