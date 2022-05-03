window.onload = () => {

    var letters_dict = {0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',
                    7:'H',8:'I',9:'J',10:'K',11:'L',12:'M',13:'N',
                    14:'O',15:'P',16:'Q',17:'R',18:'S',19:'T',20:'U',
                    21:'V',22:'W',23:'X',24:'Y',25:'Z', 26:0, 27:1,
                    28:2, 29:3, 30:4, 31:5, 32:6, 33:7, 34:8, 35:9};

    var l0 ,l1, l2, l3 = 0;
    var Image = 0;
    
  waitForElementToDisplay(".nlpRefresh",function(){
      var btn = document.querySelector(".nlpRefresh");
      btn.click();
  },1000,9000);

  waitForElementToDisplay("#nlpCaptchaImg",function(){
      console.log("Captcha Found");
      chrome.runtime.sendMessage({ img : document.getElementById("nlpCaptchaImg").src});
  },1000,9000);

  chrome.runtime.onMessage.addListener((request, sender, resp) => {
      console.log("content.js");
      console.log(request.message);
      console.log(request.data);
      var deCodedImg = request.data;
      document.getElementById("nlpCaptchaImg").src = deCodedImg;
  });
    
  waitForElementToDisplay("#nlpCaptchaImg", function(){
    delay(1200).then(() => {
      Image = document.getElementById("nlpCaptchaImg");
      text(Image);
      function text(Image) {
        if (Image != undefined || Image != null || Image != "" || Image != 0 ) {
            function processImage(image, i) {
                console.log(image);
                var img = cv.imread(image, 0);
                cv.cvtColor(img, img, cv.COLOR_BGR2GRAY, 0);
                var start_row = parseInt(img.rows*0.41)
                var start_col = parseInt(img.cols*(0.03+0.215*i))
                var end_row = parseInt(img.rows*0.55)
                var end_col = parseInt(img.cols*(.17+0.276*i))

                var rect = new cv.Rect(start_col, start_row, end_col-start_col, end_row-start_row);
                var src = img.roi(rect);
                var dst = new cv.Mat();
                var dsize = new cv.Size(28, 28);
                cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
                cv.bitwise_not(dst, dst);

                var pixelValues = dst.data.slice(0,784)
                pixelValues = Float32Array.from(pixelValues);
                pixelValues = pixelValues.map(function (item) {
                    return item / 255.0;
                });
                console.log(pixelValues);
                return [pixelValues];
          };
          model = loadModel();
          l0 = processImage(Image, 0);
          l1 = processImage(Image, 1);
          l2 = processImage(Image, 2);
          l3 = processImage(Image, 3);
          var X0 = tf.tensor(l0);
          var X1 = tf.tensor(l1);
          var X2 = tf.tensor(l2);
          var X3 = tf.tensor(l3);
          async function loadModel() {
              console.log(chrome.extension.getURL('model.json'));
              var model =  await tf.loadLayersModel(chrome.extension.getURL('model.json'));
              var result0 = model.predict(X0);
              var result1 = model.predict(X1);
              var result2 = model.predict(X2);
              var result3 = model.predict(X3);
              var max_index0 = result0.argMax(1).dataSync()[0];
              var max_index1 = result1.argMax(1).dataSync()[0];
              var max_index2 = result2.argMax(1).dataSync()[0];
              var max_index3 = result3.argMax(1).dataSync()[0];
              var val0 = letters_dict[max_index0].toString().toLowerCase();
              var val1 = letters_dict[max_index1].toString().toLowerCase();
              var val2 = letters_dict[max_index2].toString().toLowerCase();
              var val3 = letters_dict[max_index3].toString().toLowerCase();
              var val = val0 + val1 + val2 + val3;
              console.log(val);
              document.getElementById('nlpAnswer').value=val;
          }
        }
        else {
          console.log("Image not found");
        }
      };
    });
  }, 1000, 9000);

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
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
}