import "reflect-metadata";
import { container } from 'tsyringe';
import Serial from "./src/Serial.js";
import InitApplication from './src/InitApplication.js';
import deviceConfig from './src/Config/Device.js';

container.register<Serial>(Serial, {useValue: new Serial(deviceConfig.port, deviceConfig.bitRate)});

const app = container.resolve(InitApplication);

await app.initialise();

app.run();

