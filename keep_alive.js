const http = require("http");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" }); // Set content type
  res.write("I'm alive");
  res.end();
});

server.listen(8080, () =>
  console.log("Keep-alive server listening on port 8080")
);

