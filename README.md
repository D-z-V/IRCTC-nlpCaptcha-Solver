# IRCTC-nlpCaptcha-Solver

##Problem Statement
Make a Chrome extention that autofills the captchas found on the IRCTC website

##Method
Using CV and tensorflow to create an algorithm that can recognise the nlpCaptcha image and output the text, 
later converting it into an app using tensorflowjs and opencv so the it can be easily implemented into various web apps (e.g. chrome extension api .etc)

##Approach
The IRCTC website has its captcha service outsourced to Simpli5d Technologies' nlpCaptcha.
Thw way that the captcha woks that it initally shows a variety of differnt types of Captcha like text fill, image clicking ,etc.
