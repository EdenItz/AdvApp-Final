const authHelpers = require("./authHelpers");
var usersTokens = {};
var counter = 0;

module.exports = (aWss) => ({
    websocketUserCounter: (ws, req) => {
        let token = authHelpers.getToken(req);
        
        if (token && !usersTokens[token]) {
            console.log("send index");
            ++counter;
            aWss.clients.forEach(client => {
                client.send(`${counter / 2}`);
            });
            usersTokens[token] = true;
        }
        console.log("new user");
        
        ws.on('close', function close() {
            --counter;
            aWss.clients.forEach(client => {
                client.send(`${counter / 2}`);
            });
            usersTokens[token] = false
        });
    }
})
