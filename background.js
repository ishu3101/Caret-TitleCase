console.log("Extension loaded. Waiting on Caret Title Case Plugin ...");

var sendToCaret = function(command, argument, quiet) {
  var message = {
    command: command,
    argument: argument,
    quiet: quiet
  };
  ["nllpfnakhpmhjggbagjgemckanoangnd", "fljalecfjciodhpcledpamjachpmelml"].forEach(function(id) {
    chrome.runtime.sendMessage(id, message);
  });
}

function title_case(text) {
    return text.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
    var selected_text = message.context.selection;
    console.log("Selected Text:", selected_text);
    if (message.data === "titlecase") {
      console.log("TitleCase Command Executed!");
      if (selected_text){
        var titlecase = title_case(selected_text);
        console.log("Converted Selected Text to Title Case:\n", titlecase);
        sendToCaret('editor:insert', titlecase)
      }
    }
});