var self = require('sdk/self');

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

// Shows logging in Firefox, as workaround for shell console hanging when Firefox launched with profile (jpm run -p)

require("sdk/preferences/service").set("extensions.hide-adversetisements.sdk.console.logLevel", "all");

// Hide Adverse-tisements

// loads imageSources simpleStorage database

var ss = require("sdk/simple-storage");
if (!ss.storage.imageSources)
	ss.storage.imageSources = [];

console.log(ss.storage.imageSources);

// attaches content script to "ready" tab(s?) and sends imageSources to content script

require("sdk/tabs").on("ready", attachScript);

function attachScript(tab) {
	var worker = tab.attach({
		contentScriptFile: "./content-script.js"
		});
	worker.port.emit("hideThese", ss.storage.imageSources);
}

// Context menu item hides an image (only) and stores its src in imageSources

var contextMenu = require("sdk/context-menu");

var menuItem = contextMenu.Item({
	label: "Hide this",
	context: contextMenu.SelectorContext("img"), 
	contentScript: 'self.on("click", function (node) {	node.style.visibility="hidden";	self.postMessage(node.src);	});',
	onMessage: function (imgSrc) {
		ss.storage.imageSources.push(imgSrc);
		}
	});

// v2 Option to tell adverst owner you have hidden it indefinitely
// v2 Hide adversts before page is visible

// v1 Please donate to pay for: Chrome and Safari extension gallery fees