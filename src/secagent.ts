import { Ollama } from 'ollama';
import * as fs from 'fs';
import { logError, logInfo } from './logger.js';

export class secagent {
	private ollama: Ollama;
	private secagentconfig: any;
	
	constructor(configfilepath: string, ollamaHost: string) {
		this.secagentconfig = JSON.parse(fs.readFileSync(configfilepath, 'utf-8'));
		this.ollama = new Ollama({
			host: ollamaHost
		});
	}
	
	async checkCommandSafety(command: string): Promise<boolean> {
		if (this.secagentconfig.ENABLE_SECAGENT === true) {
			try {
				logInfo(`Checking command safety: "${command}"`);
				const response = await this.ollama.generate({
					model: 'llama2',
					prompt: `Using the following security policy \"${this.secagentconfig.SECURITY_POLICY}\". 
					The command is \"${command}\". Only respond with \"SAFE\" or \"UNSAFE\" and do not repeat the security policy.`,
					stream: false
				});
				
				const isSafe = !response.response.trim().toUpperCase().includes('UNSAFE');
				
				logInfo(`Safety check result for "${command}": ${isSafe ? 'SAFE' : 'UNSAFE'}`);
				logInfo(`Full response ${response.response}`);
				
				return isSafe;
			} catch (error) {
				logError(`Failed to check command safety for "${command}"`, error);
				return false;
			}
		} else {
			logInfo(`Security Agent is disabled, skipping safety check for "${command}"`);
			return true;
		}
	}   
}