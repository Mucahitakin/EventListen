(function () {
    console.log("%c 🎯 Event Logger Başlatıldı...", "color: green; font-weight: bold;");
    const eventLogDiv = document.createElement("div");
    eventLogDiv.style.position = "fixed";
    eventLogDiv.style.bottom = "10px";
    eventLogDiv.style.right = "10px";
    eventLogDiv.style.width = "400px";
    eventLogDiv.style.height = "300px";
    eventLogDiv.style.overflowY = "auto";
    eventLogDiv.style.backgroundColor = "black";
    eventLogDiv.style.color = "lime";
    eventLogDiv.style.padding = "10px";
    eventLogDiv.style.fontFamily = "monospace";
    eventLogDiv.style.fontSize = "12px";
    eventLogDiv.style.border = "2px solid lime";
    eventLogDiv.style.zIndex = "9999";
    document.body.appendChild(eventLogDiv);

    function logEvent(event) {
        let logMessage = `[${new Date().toLocaleTimeString()}] ${event.type} @ ${event.target.tagName}`;
        console.log(logMessage);

        let p = document.createElement("p");
        p.innerText = logMessage;
        eventLogDiv.appendChild(p);

        if (eventLogDiv.childNodes.length > 50) {
            eventLogDiv.removeChild(eventLogDiv.firstChild);
        }
        eventLogDiv.scrollTop = eventLogDiv.scrollHeight;
    }

    document.addEventListener("click", logEvent, true);
    document.addEventListener("input", logEvent, true);
    document.addEventListener("keydown", logEvent, true);

    const open = XMLHttpRequest.prototype.open;
    const send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
        this._url = url;
        return open.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (body) {
        this.addEventListener("load", function () {
            let logMessage = `[XHR] ${this._url} | Status: ${this.status}`;
            console.log(logMessage);

            let p = document.createElement("p");
            p.innerText = logMessage;
            eventLogDiv.appendChild(p);
            eventLogDiv.scrollTop = eventLogDiv.scrollHeight; 
        });
        return send.apply(this, arguments);
    };

    const originalFetch = window.fetch;
    window.fetch = async function (url, options) {
        let logMessage = `[FETCH] ${url}`;
        console.log(logMessage);

        let p = document.createElement("p");
        p.innerText = logMessage;
        eventLogDiv.appendChild(p);
        eventLogDiv.scrollTop = eventLogDiv.scrollHeight;

        return originalFetch(url, options);
    };

})();
