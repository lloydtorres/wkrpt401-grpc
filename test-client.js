let PROTO_PATH = __dirname + "/wkrpt401.proto"

let grpc = require('grpc');
let proto = grpc.load(PROTO_PATH).wkrpt401;

let userEmilia = {
  name: "Emilia",
  token: "best-girl-01",
  level: 9,
  personality: [
    { name: "kindness", amount: 10 },
    { name: "magic", amount: 7 }
  ]
}

function main() {
  let client = new proto.UserManager("localhost:8080",
                                      grpc.credentials.createInsecure());

  client.getBestPersonality(userEmilia, function(err, response) {
    console.log(response.response);
  });
}

main();
