//import Player from "winplayer-node";
import "reflect-metadata";
import { container } from 'tsyringe';
import Serial from "./src/Serial.js";
import InitApplication from './src/InitApplication.js';
import deviceConfig from './src/Config/Device.js';

container.register<Serial>(Serial, {useValue: new Serial(deviceConfig.port, deviceConfig.bitRate)});

const app = container.resolve(InitApplication);

await app.initialise();

console.log(app.getRunningMediaApp());

// let player;

// async function onUpdate(){
// 	let update = await player.getUpdate();
// 	console.log(update);
// }

// player = new Player(onUpdate);

