/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// the object that will hold all the posts
const data = {results:[]};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
};

const requestHandler = (request, response) => {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log(`Serving request type ${request.method} for url ${request.url}`);

  // The outgoing status.
  let statusCode = 200;

  // See the note below about CORS headers.
  const headers = defaultCorsHeaders;
  
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json'; // originally was `'text/plain';`
  
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // request.options("*", function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   res.status(200).end();
  // })
  
  // if the end point does not exist
  if(request.url.slice(0, 8) !== '/classes'){ 
    // then it should 404
    response.writeHead(404, headers);
    // end the response
    response.end();
  };

  // `POST` method
  if (request.method === 'POST'){   // do this with OPTIONS !!!!!
  // change status code to 201
  response.writeHead(201, headers);
  let post = '';
  request.on('data', function(data){
    // concat `data` to `post`
    post += data;
  })
  request.on('end', function(){
    // add the post to the `data` object
    data.results.push(JSON.parse(post));
  })
  // end the response
  response.end();
}

// if(request.method === 'OPTIONS'){
//   response.writeHead(200, headers);
//   response.end();
// }

// if(request.method === 'GET'){
//   response.writeHead(statusCode, headers);
//   response.end(JSON.stringify(data))
// }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  //console.log(data);
  response.end(JSON.stringify(data));
};

module.exports.requestHandler = requestHandler;