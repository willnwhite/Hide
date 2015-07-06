// Hide Adverse-tisements

// check for matches once storedImageSources received

self.port.on("hideThese", function(storedImageSources) {
	
	var imgSrcs = [];
	for (var i = 0; i < document.getElementsByTagName("img").length; i++) {
		imgSrcs.push(document.getElementsByTagName("img")[i].src);
		}

	for (var i = 0; i < imgSrcs.length; i++) {
		if (storedImageSources.indexOf(imgSrcs[i]) != -1) {
			document.getElementsByTagName("img")[i].style.visibility="hidden";
			}
		}
});

// When the user clicks your menu item, an event named "click" is emitted in the item's content script.

/* self.on("click", function (node) {
	node.style.visibility="hidden";
	self.postMessage(node.src);
	}); */