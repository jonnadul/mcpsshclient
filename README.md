# mcpsshclient
A simple model context protocol compliant sshclient, that works!!

# Setup Instructions
1. Run ```git clone https://github.com/jonnadul/mcpsshclient.git```
2. Run ```npm run build```
3. For Claude Desktop, add the following to claude_desktop_config.json
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
4. Run or restart Claude Desktop

# Usage
Just ensure that Claude first successully performs the new-ssh-connection operation before attempting to run any commands. Outside of that have (responsible) fun! :rocket: