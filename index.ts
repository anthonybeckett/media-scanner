//import Player from "winplayer-node";
import "reflect-metadata";
import { container } from 'tsyringe';

import InitApplication from './src/InitApplication.js';

//const app = new InitApplication();
const app = container.resolve(InitApplication);

await app.initialise();

console.log(app.getRunningMediaApp());

//console.log(await isApplicationRunning('vlc'));


// Check if media player is running
// psNode.lookup({
// 	command: 'Microsoft.Media.Player',
// }, 
// function(err, resultList ) {
// 	if (err) {
// 		throw new Error( err );
// 	}

// 	resultList.forEach(function( process ){
// 		if( process ){
// 			console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
// 		}
// 	});
// }
// );

// psNode.lookup({
// 		command: 'code'
// 	},
// 	function(err, resultList){
// 		if (err) {
// 			throw new Error( err );
// 		}
// 	}
// );

// let player;

// async function onUpdate(){
// 	let update = await player.getUpdate();
// 	console.log(update);
// }

// player = new Player(onUpdate);

