chrome.runtime.onMessage.addListener((request, sender, resp) => { 
    axios.get( request.img , { responseType:"blob" }).then(function (response) {
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
});
    






