var http = require("http"),
    fs = require("fs"),
    marked = require("marked");

http.createServer(responseHandler).listen(process.env.PORT); //test then change to process.env.PORT

function responseHandler(request, response){
  if (request.url.match("fav")) {
    response.end("");
    return;
  }
  if (request.url === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('index.html', 'utf8', function (error, data) {
      response.end(data);
    });
  } else if (request.url.match(/\/markdown\//)) {
    var mdContent = decodeURIComponent(request.url.replace(/\/markdown\//, ""));
    response.end(marked(mdContent));
  }
}
