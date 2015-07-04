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
var menuItem = contextMenu.Item({
	label: "Hide this",
	context: contextMenu.SelectionContext(),
	contentScript: 	'self.on("click", function() {' +
					'	var adverst = window.getSelection();' +
					'	adverst.style.display="hidden";' +
					'});',
	});