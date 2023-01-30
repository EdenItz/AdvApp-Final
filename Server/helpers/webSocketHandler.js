const authHelpers = require("./authHelpers");
var usersTokens = {};
var counter = 0;

module.exports = (aWss) => ({
    websocketUserCounter: (ws, req) => {
        let token = authHelpers.getToken(req);

        aWss.clients.forEach(client => {
            client.send(counter);
        });
        if (token && !usersTokens[token]) {
            ++counter;
            usersTokens[token] = true;

            ws.on('close', function close() {
                --counter;
                aWss.clients.forEach(client => {
                    client.send(counter);
                });
                usersTokens[token] = false
            });
        }
    }
})
