const letters_dict = {0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',
                    7:'H',8:'I',9:'J',10:'K',11:'L',12:'M',13:'N',
                    14:'O',15:'P',16:'Q',17:'R',18:'S',19:'T',20:'U',
                    21:'V',22:'W',23:'X',24:'Y',25:'Z', 26:0, 27:1,
                    28:2, 29:3, 30:4, 31:5, 32:6, 33:7, 34:8, 35:9};


imgPath = "images/img2.jpg";

document.getElementById("imageSrc").src = imgPath;
const Image = document.getElementById("imageSrc");

var l0 ,l1, l2, l3 = 0;

cv['onRuntimeInitialized']=()=>{
    function processImage(image, i) {
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

            cv.imshow(document.getElementById("canvasOutput"+ i.toString()), dst);
            return [pixelValues];
    };
    model = loadModel();
    l0 = processImage(Image, 0);
    l1 = processImage(Image, 1);
    l2 = processImage(Image, 2);
    l3 = processImage(Image, 3);
    console.log(l0 ,l1, l2, l3);
    const X0 = tf.tensor(l0);
    const X1 = tf.tensor(l1);
    const X2 = tf.tensor(l2);
    const X3 = tf.tensor(l3);
    console.log(X0, X1, X2, X3);
    async function loadModel() {
        const model =  await tf.loadLayersModel('tfjs/model.json');
        const result0 = model.predict(X0);
        const result1 = model.predict(X1);
        const result2 = model.predict(X2);
        const result3 = model.predict(X3);
        const max_index0 = result0.argMax(1).dataSync()[0];
        const max_index1 = result1.argMax(1).dataSync()[0];
        const max_index2 = result2.argMax(1).dataSync()[0];
        const max_index3 = result3.argMax(1).dataSync()[0];
        const val0 = letters_dict[max_index0].toString().toLowerCase();
        const val1 = letters_dict[max_index1].toString().toLowerCase();
        const val2 = letters_dict[max_index2].toString().toLowerCase();
        const val3 = letters_dict[max_index3].toString().toLowerCase();
        const val = val0 + val1 + val2 + val3;
        console.log(val);
        document.getElementById('output').innerHTML = val;
    }
};




