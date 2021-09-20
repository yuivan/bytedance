const http = require("http");
const server = http.createServer((req, response) => {
  const { url, method, headers } = req;
  response.end("123s");
});

server.listen("3000");
