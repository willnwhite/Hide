/* 1. A "contextmenu" DOM event that you can listen for in an injected script.
This event gives you the opportunity to add context information to the event or to prevent the menu
from displaying. */

document.addEventListener("contextmenu", handleContextMenu, false);

function handleContextMenu(event) { // runs BEFORE users clicks No More
    safari.self.tab.setContextMenuEventUserInfo(event, event.target.nodeID); // Store the element's unique ID... target.nodeID? The data you store can be retrieved from the userInfo property of later events. You can store any data as user info that you can pass in a message.
}

safari.self.addEventListener("message", handleMessage, false);

function handleMessage(msgEvent) {
    if (msgEvent.name === "hideElement") {
        msgEvent.userInfo // hide element
    }
}