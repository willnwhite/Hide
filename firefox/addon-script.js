var self = require('sdk/self');

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

// Hide Distasteful Advertising

// loads hidden images' sources

var ss = require("sdk/simple-storage");
if (!ss.storage.imageSources)
	ss.storage.imageSources = [];

// attaches content script to "ready" tab(s?) and sends imageSources to content script

var tabs = require("sdk/tabs");
tabs.on("ready", attachScript);

function attachScript(tab) {
	var worker = tab.attach({
		contentScriptFile: "./content-script.js"
		});
	worker.port.emit("hideThese", ss.storage.imageSources);
}

// Import the context-menu API
var contextMenu = require("sdk/context-menu");

// Context menu item hides the image and stores its source URL in simple-storage
var Hide = contextMenu.Item({
	label: "Hide",
	context: contextMenu.SelectorContext("img"), // images only
	contentScript: 'self.on("click", function (node) {	node.style.visibility="hidden";	self.postMessage(node.src);	});',
	onMessage: function (imgSrc) {
		ss.storage.imageSources.push(imgSrc);
		}
});

// Context menu item unhides the image and deletes its source URL from simple-storage
var Unhide = contextMenu.Item({
  label: "Un-hide",
  context: [contextMenu.SelectorContext("img"),contextMenu.PredicateContext(hasImageBeenHidden)],
  contentScript: 'self.on("click", function (node) { node.style.visibility="hidden";' + // v1.1.1 or "visible" if on page
  ' self.postMessage(node.src); });',
  onMessage: function (imgSrc) {
    var index = ss.storage.imageSources.indexOf(imgSrc, 0);
    ss.storage.imageSources.splice(index, 1);
  }
});

function hasImageBeenHidden(image) {
  for (i = 0; i < ss.storage.imageSources.length; i++) {
    if (image.srcURL === ss.storage.imageSources[i]) {
      return true;
    }
  }
}

// Import the simple-prefs API
var sp = require("sdk/simple-prefs");
// Defines what the Preferences buttons do
sp.on("showHidden", function() {
  tabs.open("./hidden.html");
  });

// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Create a page-mod
// It will run a script whenever a "resource://hide-adversetisements/data/hidden.html" URL is loaded
pageMod.PageMod({
  include: "resource://hide-adversetisements/data/hidden.html",
  contentScriptFile: "./hidden.js",
  // Send the content script a message inside onAttach
  onAttach: function(worker) {
    worker.port.emit("replacePage", ss.storage.imageSources);
  }
});

// v2 Option to tell adverst owner you have hidden it indefinitely
// v1.1.1 Hide adversts before page is displayed
// v1.1.1 Un-hide adversts on page
// v1.1.1 Don't open hidden.html more than once using Open button.

// v1 Please donate to pay for: Chrome and Safari extension gallery fees
