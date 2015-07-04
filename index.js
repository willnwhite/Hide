var self = require('sdk/self');

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

// Hide Adverse-tisements

// Context menu item

var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item(
	{
	label: "Hide this",
	context: contextMenu.SelectorContext("img"), 
	contentScript: 'self.on("click", function (node) { node.style.visibility="hidden"; })', //  hides image on being clicked
	}
	);

// Hide that adverst indefinitely	
// Option to tell adverst owner you have hidden it indefinitely
// Please donate to pay for: Chrome and Safari extension gallery fees