require('./index.scss')
// import './index.scss'
const bigImg = require('./happy.jpg')
const logo = require('./logo.png')

console.log('hello webpack!!!!')

var body = document.body,
    imgWrap = document.createElement('div'),
    imgBig = new Image(),
    logoImg = new Image();
  
imgBig.src = bigImg.default
logoImg.src = logo.default
imgWrap.appendChild(imgBig);
imgWrap.appendChild(logoImg);
body.appendChild(imgWrap);
// console.log('bigImg: ', bigImg.default);
