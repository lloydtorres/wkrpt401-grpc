let PROTO_PATH = __dirname + "/wkrpt401.proto"

let grpc = require('grpc');
let proto = grpc.load(PROTO_PATH).wkrpt401;

var requestCount = 0

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
  requestCount++
  console.log("getBestPersonality called with response '" + response + "'" + " (request #" + requestCount + ")");
  callback(null, {response: response});
}

function main() {
  var server = new grpc.Server();
  server.addProtoService(proto.UserManager.service, {getBestPersonality: getBestPersonality});
  server.bind("localhost:50051", grpc.ServerCredentials.createInsecure());

  server.start();
  console.log("WKRPT401 gRPC server starting.");
}

main();
