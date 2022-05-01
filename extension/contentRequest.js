const requestSender = new XMLHttpRequest();

requestSender.onreadystatechange = apiHandler;

function apiHandler(response) {
    if (requestSender.readyState === 4 && requestSender.status === 200) {
        console.log(response);
    }
    else {
        console.log(requestSender.readyState);
        console.log(requestSender.status);
    }
}

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
      if (document.querySelector(selector) != null) {
        callback();
        return;
      }
      else {
        setTimeout(function () {
          if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
            return;
          loopSearch();
        }, checkFrequencyInMs);
      }
    })();
}


var link = null;

waitForElementToDisplay("#nlpCaptchaImg",function(){
    link = document.querySelector("#nlpCaptchaImg");
},1000,9000);
console.log(link);

requestSender.open('GET', link, true);
requestSender.send();