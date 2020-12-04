

const thermalModelURL = 'thermal_model/model.json'
const digitalModelURL = 'digital_model/model.json'


const imageSize = 224;

let targetSize = { w: imageSize, h: imageSize }
let model
let imageElement
let colorMap

/**
 * load the TensorFlow.js model
 */
window.loadThermalModel = async function () {


  preloader.style.display = 'block';
  // https://js.tensorflow.org/api/1.1.2/#loadGraphModel
  model = await tf.loadLayersModel(thermalModelURL)
  model.summary();
  preloader.style.display = 'none';

  
}
window.loadDigitalModel = async function () {


  preloader.style.display = 'block';
  // https://js.tensorflow.org/api/1.1.2/#loadGraphModel
  model = await tf.loadLayersModel(thermalModelURL)
  model.summary();
  preloader.style.display = 'none';

  
}


window.loadImage = function (input) {
  preloader.style.display = 'block';
  if (input.files && input.files[0]) {
   
    let reader = new FileReader()

    reader.onload = function (e) {
      let src = e.target.result

      document.getElementById('canvasimage').getContext('2d').clearRect(0, 0, imageSize, imageSize)
      document.getElementById('canvassegments').getContext('2d').clearRect(0, 0,imageSize, imageSize)

      imageElement = new Image()
      imageElement.src = src

      imageElement.onload = function () {
        // let resizeRatio = imageSize / Math.max(imageElement.width, imageElement.height) //comment it
        // targetSize.w = Math.round(resizeRatio * imageElement.width) //comment it
        // targetSize.h = Math.round(resizeRatio * imageElement.height) //comment it

        let origSize = {
          w: imageElement.width,
          h: imageElement.height
        }
        imageElement.width = 224 //e
        imageElement.height = 224 //e

        let canvas = document.getElementById('canvasimage')
        canvas.width = targetSize.w
        canvas.height = targetSize.w
        canvas
          .getContext('2d')
          .drawImage(imageElement, 0, 0, imageElement.height,imageElement.width) //e
        // document.getElementById('canvassegments').getContext('2d').clearRect(0, 0,imageElement.height,imageElement.width) //modificatioon 28-11

       
      }
    }

    reader.readAsDataURL(input.files[0])
  } else {
    alert('no image uploaded', true)
  }
  setTimeout(()=>preloader.style.display = 'none',1000);
}

/**
 * run the model and get a prediction
 */

window.runModel = async function () {
  // preloader.style.display = 'block';
  if (imageElement) {
    
    
   

    let img = preprocessInput(imageElement)
    console.log('model.predict (input):', img.dataSync())

 

    // https://js.tensorflow.org/api/latest/#tf.Model.
    // const output = model.predict(img)
    // const output =await model.predict([img.reshape([1,28,28,1])]).print();

    const output = await model.predict([img.reshape([1,224,224,3])]).array().then(op=> {setTimeout(()=>preloader.style.display = 'none',1000);/*console.log(op+"  hurray!!");*/generateChart(op[0])})
    // model.predict([tf.tensor(input).reshape([1, 28, 28, 1])]).array()

   

    console.log('model.predict (output):', output)
    // setTimeout(preLoaderHandler,1000);
   
  } else {
   console.log('no image available', true)
   preloader.style.display = 'none'
  }
  
}
function preprocessInput (imageInput) {
  
    console.log('preprocessInput started')
  
    let inputTensor = tf.browser.fromPixels(imageInput,3)
  
    // https://js.tensorflow.org/api/latest/#expandDims
    let preprocessed = inputTensor.expandDims()
  
    console.log('preprocessInput completed:', preprocessed)
    return preprocessed
  }

 function execute(){
  preloader.style.display = 'block';
  // console.log(preloader.style.display);
  setTimeout(async()=>await runModel(),1000);
}