import psNode, { Program } from "ps-node";
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class Application {

    constructor(){
        
    }

    isApplicationRunning(processName: string): Promise<boolean>{
        if(processName === undefined){
            throw new Error("No process to search for");
        }

        const command = {
            command: processName
        }
    
        return new Promise((resolve, reject) => {
            psNode.lookup(command, function(error: Error, resultList: Program[]){
                if(error){
                    return reject(error);
                }
        
                resolve(resultList.length > 0);
            });
        });
    }
}