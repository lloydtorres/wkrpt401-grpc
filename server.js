let PROTO_PATH = __dirname + "/wkrpt401.proto"

let grpc = require('grpc');
let proto = grpc.load(PROTO_PATH).wkrpt401;

function getBestPersonality(call, callback) {
  let userData = call.request;
  let name = userData.name;
  let level = userData.level;

  var maxPersonalityName = "";
  var maxPersonalityValue = -1;
  for (var i in userData.personality) {
    let personalityName = userData.personality[i].name;
    let personalityValue = userData.personality[i].amount;
    if (personalityValue > maxPersonalityValue) {
      maxPersonalityName = personalityName;
      maxPersonalityValue = personalityValue;
    }
  }

  let response = "The best personality attribute for " + name
                    + " (Lv. " + level + ") is "
                    + maxPersonalityName + " @ "
                    + maxPersonalityValue;
  console.log("getBestPersonality called with response '" + response + "'");
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
