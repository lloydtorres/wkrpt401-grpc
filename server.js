let PROTO_PATH = __dirname + "/wkrpt401.proto"

let grpc = require('grpc');
let proto = grpc.load(PROTO_PATH).wkrpt401;

function getBestPersonality(call, callback) {
  let userData = call.request;
  var maxPersonalityValue = -1;
  var maxPersonalityName = "";
  for (var key in userData.personality) {
    if (userData.hasOwnProperty(key)) {
      let personalityValue = userData.personality[key];
      if (personalityValue > maxPersonalityValue) {
        maxPersonalityValue = personalityValue;
        maxPersonalityName = key;
      }
    }
  }

  let name = userData.name;
  let level = userData.level;
  let response = "The best personality attribute for " + name
                    + " (Lv. " + level + ") is " +
                    + maxPersonalityName;
  print("getBestPersonality called with response '" + response + "''");
  callback(null, {response: response});
}

function main() {
  var server = new grpc.Server();
  server.addProtoService(proto.UserManager.service, {getBestPersonality: getBestPersonality});
  let url = "localhost:8080";
  if (process.env.PORT) {
    url = "bmo-wkrpt401-grpc.herokuapp.com:" + process.env.PORT;
  }
  server.bind(url, grpc.ServerCredentials.createInsecure());

  server.start();
  console.log("WKRPT401 gRPC server starting @ " + url);
}

main();
