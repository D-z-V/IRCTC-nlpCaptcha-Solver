# IRCTC-nlpCaptcha-Solver

## Problem Statement
Make a Chrome extention that autofills the Captchas found on the IRCTC website.

## Method
Using CV and tensorflow to create an algorithm that can recognise the nlpCaptcha image and output the text, 
later converting it into an app using tensorflowjs and opencv so the it can be easily implemented into various web apps (e.g. chrome extension api .etc)

Finding/Creating Dataset -> Data-Processing -> Building and Training Model -> Converting into js -> Building an app -> Converting it into a Chrome Extension

## Approach
The IRCTC website has its captcha service outsourced to Simpli5d Technologies' nlpCaptcha.
Thw way that the captcha woks that it initally shows a variety of differnt types of Captcha like text fill, image clicking ,etc.

### *Inital Captacha*
![inital_captcha](readme-assets/cap1.jpg)

But once refreshed it subequntly follows the same captcha pattern of text filling for every refresh

### *Captacha pattern on reload*
![cap2](readme-assets/cap5.jpg) 
![cap2](readme-assets/cap4.jpg) 

So this could easily be tackled by mkaing the script.js and adding a click event to the button so that the captacha automatically gets refreshed once it loads. 

## Collecting Data to train the model
Initally I attemped to use the MINST 0-9 digits and A-Z handwritten lettes data-set in order to train the model but that accuracy of those ended up being less than 70%.
So I decided to make a comed data set of around 600 images from the MINST and arounf 600 from the captcha iself.
Since each captcha had 4 letters/digits in them I used opencv to separate each letter into a image of 28x28 pixels (As to keep them the same size of the MIST dataset)

## Building and Training the Model
I made a classic Multi-layer Perceptron neural network and traind using the keras.tensorflow library it with the data the accuracy on this was suprisingly great.

### *Accuracy : 96%*
![tensorboard1](readme-assets/accuracy.jpg)

### *Loss : 0.2*
![tensorboard1](readme-assets/loss.jpg) 

## Converting the model to JavaSrcipt and building the app

Now that the model has been saved, I converted it into JavaScript using tensorflow-converter. After that I built an app that can take the image and sparate them into letters using OpenCV.js and then predicting the results through the Model and print out the text in the console and an HTML element [script.js](app/script.js)

### *App*
![prediction1](readme-assets/app1.jpg) 
![prediction1](readme-assets/app2.jpg) 

## Building the Chrome extension
###
![extension](readme-assets/extension.jpg)

The Chrome extention worked pretty well initally as I was testing out the auto-ckick for the refrest button and then auto-filling the from with some random words, etc. But when I tried to fetch the image from the captcha I started to run into some issues.

## Issues

I stared to run across this issue when I try to retrive the image from the <img> tag, Up until now I had been saving the captcha image locally for testing it in the app and while testing my model. But, when I tried to make a request to GET the image from the Captcha's Server. It throws the following error:

![prediction1](readme-assets/err.jpg)

After doing a some searching I found out the the server that my app had been requesting the image had CORS (Cross-origin-resource-sharing) resticted so I was not allowing my app to fetch the image from the source. I tried mutliple ways of solving this but sill haven't found a work-around for this issue. [MDN - Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)

## Conclusion

Given 90% of the work being done I still look to find a work-around this issue.

Although not being able to reach the final intended goal I still had fun working on this project.
