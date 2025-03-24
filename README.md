# mcpsshclient
An :sparkle: agentic :sparkle: model context protocol compliant sshclient!

# Prerequisite
To enable the agentic capabilities.
1. Download https://ollama.com/.
2. Run ```ollama serve```
3. Run ```ollama pull llama2```
4. Run ```ollama run llama2```

# Setup Instructions
1. Run ```git clone https://github.com/jonnadul/mcpsshclient.git```
2. Run ```npm run build```

To enable the security agent, set ```"ENABLE_SECAGENT": true``` and ```"SECURITY_POLICY"``` in ```secagentconfig.json```

# Configuration
In your MCP Client make the corresponding change
```
{
  "mcpServers": {
    "sshclient": {
      "command": "node",
      "args": [
        "C:\\[full-path-to-mcpsshclient]\\build\\index.js"
      ]
    }
  }
}
```

So far tested on the following:
- Claude Desktop: ```claude_desktop_config.json```
- Cursor AI: Command Panel -> Cursor Settings -> MCP Server


Have (responsible) fun! :rocket: