import * as fs from 'fs';
import * as path from 'path';

const LOG_FILE = path.join(import.meta.dirname, '../sshclient.log');

export function logError(message: string, error?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ERROR: ${message}${error ? '\n' + JSON.stringify(error, null, 2) : ''}\n`;
  fs.appendFileSync(LOG_FILE, logMessage);
}

export function logInfo(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] INFO: ${message}\n`;
  fs.appendFileSync(LOG_FILE, logMessage);
}
