import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Client } from 'ssh2';

import { z } from "zod";

const USER_AGENT = "sshclient-app/1.0";

// Create sshclient MPC server instance
const server = new McpServer({
  name: "sshclient",
  version: "1.0.0",
});

const conn = new Client();

server.tool(
  "new-ssh-connection",
  "Create a new ssh connection to a server",
  {
    host: z.string().describe("Host of the server"),
    port: z.number().default(22).describe("Port of the server"),
    username: z.string().describe("Username for the connection"),
    password: z.string().describe("Password for the connection"),
  },
  async ({ host, port, username, password }) => {
    return new Promise((resolve, reject) => {
      conn.on('ready', () => {
        resolve({
            content: [
            {
              type: "text",
              text: `SSH connection to ${host} as ${username} established`
            }
          ]
        });
      }).on('error', (err) => {
        reject({
            content: [
            {
              type: "text",
              text: `SSH connection to ${host} failed: ${err.message}`
            }
          ]
        });
      }).connect({
        host: host,
        port: port,
        username: username,
        password: password
      });
    });
  }
)

server.tool(
  "run-command",
  "Run a command on the server through an ssh connection",
  {
    command: z.string().describe("Command to run on the server")
  },
  async ({ command }) => {
    return new Promise((resolve, reject) => {
      conn.exec(command, (err, stream) => {
        if (err) {
          reject({
            content: [
              {
                type: "text",
                text: `Failed to execute command: ${err.message}`
              }
            ]
          });
          return;
        }

        let stdout = '';
        let stderr = '';

        stream.on('close', (code: number, signal: string) => {
          resolve({
            content: [
              {
                type: "text",
                text: `Command executed with exit code ${code} and signal ${signal}\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`
              }
            ]
          });
        }).on('data', (data: Buffer) => {
          stdout += data;
        }).stderr.on('data', (data) => {
          stderr += data;
        });
      });
    });
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SSHClient MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});