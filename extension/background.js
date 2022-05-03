chrome.runtime.onMessage.addListener((request, sender, resp) => { 
    console.log("background.js");
    chrome.downloads.download({ url: request.img }, (downloadId) => {
        console.log(downloadId);
        delay(700).then(() => {
            chrome.downloads.search({}, function(results) {
                console.log(results[0].filename);
                axios.get( "file://" + results[0].filename , { responseType:"blob" }).then(function (response) {
                    console.log(response);
                    var reader = new window.FileReader();
                    reader.readAsDataURL(response.data); 
                    reader.onload = function() {
                        var imageDataUrl = reader.result;
                        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                            chrome.tabs.sendMessage(tabs[0].id, {
                                message: "captcha",
                                data: imageDataUrl
                            });
                        });
                    }
                });
            })
        });
    })

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
});
    






