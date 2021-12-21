const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const port = process.env.API_PORT || process.env.PORT || 3000;

// server listening
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});