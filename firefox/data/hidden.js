// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replacePage", function(message) {
  for (i = 0; i < message.length; i++) {
    document.body.innerHTML += "<img src=" + message[i] + ">";
  }
});
