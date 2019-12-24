// Initial load, similar to componentDidMount in React
function setup() {
  noCanvas();

  var video = createCapture(
    {
      audio: false,
      video: {
        width: 480,
        height: 680
      }
    },
    function() {
      console.log("iPhone/Android front camera ready.");
    }
  );
  video.id("cam");
  video.parent("vid");

  // // Config for iPhone/Android
  // background();
  // video.elt.setAttribute("playsinline", "");
  // camera.hide();
  // const canvas = createCanvas(480, 640);
  // function draw() {
  //   background(255);
  //   image(video, 0, 0);
  //   filter(INVERT);
  // }

  const reverse = document.getElementById("reverseCamera");
  reverse.disabled = "true";
  const homeL = document.getElementById("homeLogo");
  homeL.disabled = "true";

  // for geolocation
  let lat, lon;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      const latlonJson = [
        {
          lat: lat,
          lon: lon
        }
      ];
      localStorage.setItem("latlon", JSON.stringify(latlonJson));
    });
  } else {
    () => console.log("Geolocation not available");
  }

  const button1 = document.getElementById("submit1");
  button1.addEventListener("click", async event => {
    const button1 = document.getElementById("submit1");
    button1.disabled = "true";
    button1.style.opacity = "0.3";
    button1.background = "rgba(0, 255, 0, 0.5)";
    console.log("1", button1.disabled);
    setTimeout(() => {
      const button1 = document.getElementById("submit1");
      button1.disabled = "true";
      button1.style.opacity = "0.7";
      button1.textContent = `✨`;
      console.log("2", button1.disabled);

      // video.size(200, 200);
      // const drawing = draw();
      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const selfieC = document.getElementById("selfieCoach");
      const coachPose = selfieC.src;
      const moodV = document.getElementById("mood").value;
      const mood = moodV.value;
      const data = {
        lat,
        lon,
        mood,
        image64,
        coachPose
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = fetch("/db", options);
      // const json2 = response.json();
      // console.log("3", button1.disabled);
    }, 0);
    setTimeout(() => {
      const button1 = document.getElementById("submit1");
      button1.disabled = !button1.disabled;
      button1.background = "#d3d3d3";
      button1.style.opacity = "0.7";
      button1.textContent = `⚡`;
      console.log("4", button1.disabled);
    }, 500);
  });

  const button2 = document.getElementById("submit2");
  button2.addEventListener("click", async event => {
    const button2 = document.getElementById("submit2");
    button2.disabled = "true";
    button2.style.opacity = "0.3";
    button2.background = "rgba(0, 255, 0, 0.5)";
    console.log("1", button2.disabled);
    setTimeout(() => {
      const button2 = document.getElementById("submit2");
      button2.disabled = "true";
      button2.style.opacity = "0.7";
      button2.textContent = `✨`;
      console.log("2", button2.disabled);

      // video.size(200, 200);
      // const drawing = draw();
      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const selfieC = document.getElementById("selfieCoach");
      const coachPose = selfieC.src;
      const moodV = document.getElementById("mood").value;
      const mood = moodV.value;
      const data = {
        lat,
        lon,
        mood,
        image64,
        coachPose
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = fetch("/db", options);
      // const json2 = response.json();
      // console.log("3", button2.disabled);
    }, 3000);
    setTimeout(() => {
      const button2 = document.getElementById("submit2");
      button2.disabled = !button2.disabled;
      button2.background = "#d3d3d3";
      button2.style.opacity = "0.7";
      button2.textContent = `⚡`;
      console.log("4", button2.disabled);
    }, 3500);
  });

  const button3 = document.getElementById("submit3");
  button3.addEventListener("click", async event => {
    const button3 = document.getElementById("submit3");
    button3.disabled = "true";
    button3.style.opacity = "0.3";
    button3.background = "rgba(0, 255, 0, 0.5)";
    console.log("1", button3.disabled);
    setTimeout(() => {
      const button3 = document.getElementById("submit3");
      button3.disabled = "true";
      button3.style.opacity = "0.7";
      button3.textContent = `✨`;
      console.log("2", button3.disabled);

      // video.size(200, 200);
      // const drawing = draw();
      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const selfieC = document.getElementById("selfieCoach");
      const coachPose = selfieC.src;
      const moodV = document.getElementById("mood").value;
      const mood = moodV.value;
      const data = {
        lat,
        lon,
        mood,
        image64,
        coachPose
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = fetch("/db", options);
      // const json2 = response.json();
      // console.log("3", button3.disabled);
    }, 10000);
    setTimeout(() => {
      const button3 = document.getElementById("submit3");
      button3.disabled = !button3.disabled;
      button3.background = "#d3d3d3";
      button3.style.opacity = "0.7";
      button3.textContent = `⚡`;
      console.log("4", button3.disabled);
    }, 10500);
  });
}

// for image overlay resizing sliders
const selfieC = document.getElementById("selfieCoach");
const rangeW = document.getElementById("widthRange");
const rangeH = document.getElementById("heightRange");
rangeW.value = selfieC.width;
rangeH.value = selfieC.height;

const callFetch = fetch("/api")
  .then(response => {
    console.log("response ok?: ", response.ok);
    return response.json();
  })
  .then(data => {
    const unsplashJSON = JSON.stringify(data);
    localStorage.setItem("unsplashModels", unsplashJSON);
  });

// const buttonFlipCamera = document.getElementById("flipCamera");
// buttonFlipCamera.addEventListener("click", event => {
//   const camera = document.getElementById("cam");
//   if (camera.width === 480) {
//     const camInit = createCapture(
//       {
//         audio: false,
//         video: {
//           width: 640,
//           height: 480
//         }
//       },
//       function() {
//         console.log("iPhone/Android front camInit ready.");
//       }
//     );
//     camera.remove();
//     camInit.id("cam");
//     camInit.parent("vid");
//   }
// });

// const buttonReverseCamera = document.getElementById("reverseCamera");
// buttonReverseCamera.addEventListener("click", event => {
//   const video = createCapture(
//     {
//       audio: false,
//       video: {
//         facingMode: {
//           exact: "environment"
//         },
//         width: 640,
//         height: 480
//       }
//     },
//     function() {
//       console.log("reversVideo on iPhone/Android ready.");
//     }
//   );
//   video.elt.setAttribute("playsinline", "");
//   // video.hide();
//   video.size(640, 480);
//   canvas = createCanvas(640, 480);
//   function draw() {
//     image(video, 0, 0);
//   }
// });

const buttonNearby = document.getElementById("nearbyLink");
buttonNearby.addEventListener(
  "click",
  event => {
    event.preventDefault();
    const buttonNearby = document.getElementById("nearbyLink");
    const latlonString = localStorage.getItem("latlon");
    const latlonArr = JSON.parse(latlonString);
    const strLink =
      "https://www.latlong.net/c/?lat=" +
      latlonArr[0].lat +
      "&long=" +
      latlonArr[0].lon;
    buttonNearby.setAttribute("href", strLink);
    parent.open(strLink);
  },
  false
);

const buttonOverlay = document.getElementById("overlayCoach");
buttonOverlay.addEventListener("click", event => {
  const selfieC = document.getElementById("selfieCoach");
  const root = document.createElement("div");
  const image = document.createElement("img");
  image.src = selfieC.src;
  image.id = "cursorImage";
  image.style.opacity = "0.5";
  image.style.cursor = "grab";
  image.width = selfieC.width;
  image.height = selfieC.height;
  image.style.ondragstart = "return false;";

  const buttonAutoWidth = document.getElementById("autoWidth");
  const buttonAutoHeight = document.getElementById("autoHeight");
  buttonAutoWidth.disabled = !buttonAutoWidth.disabled;
  buttonAutoHeight.disabled = !buttonAutoHeight.disabled;

  root.append(image);
  document.body.append(root);

  addListeners();
  console.log("hello from overlayCoach");
});

const buttonAutoWidth = document.getElementById("autoWidth");
buttonAutoWidth.addEventListener("click", async event => {
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  const ratioWH = selfieC.width / selfieC.height;
  overlayM.width = overlayM.height * ratioWH;
});

const buttonAutoHeight = document.getElementById("autoHeight");
buttonAutoHeight.addEventListener("click", async event => {
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  const ratioHW = selfieC.height / selfieC.width;
  overlayM.height = overlayM.width * ratioHW;
});

const rangeWidthRangeDiv = document.getElementById("widthRangeDiv");
rangeWidthRangeDiv.addEventListener("click", async event => {
  const sliderWidth = document.getElementById("widthRange");
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  const rangeW = document.getElementById("widthRange");
  rangeW.max = selfieC.width;
  overlayM.width = sliderWidth.value * 2;
});

const rangeHeightRangeDiv = document.getElementById("heightRangeDiv");
rangeHeightRangeDiv.addEventListener("click", async event => {
  const sliderHeight = document.getElementById("heightRange");
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  const rangeH = document.getElementById("heightRange");
  rangeH.max = selfieC.height;
  overlayM.height = sliderHeight.value * 2;
});

const buttonCoach = document.getElementById("newCoach");
buttonCoach.addEventListener("click", event => {
  const unsplashString = localStorage.getItem("unsplashModels");
  const picArr = JSON.parse(unsplashString);
  const quickMaths = Math.floor(Math.random(picArr.length) * picArr.length);
  const oneRandomPic = picArr[quickMaths];
  const image = document.getElementById("selfieCoach");
  const altDescription = document.getElementById("figCap");
  image.src = oneRandomPic.urls.regular + ".png";
  if (oneRandomPic.alt_description) {
    image.title = oneRandomPic.alt_description;
    altDescription.textContent = oneRandomPic.alt_description;
  } else {
    image.title = oneRandomPic.alt_description;
    altDescription.textContent = "vogue";
  }
  // root.append(image);
  // document.body.append(root);
  // for (item of picArr) {
  //   const image = document.createElement("img");
  //   image.src = item.urls.thumb + ".png";
  //   if (item.alt_description) {
  //     image.alt = item.alt_description;
  //   } else {
  //     image.alt = "vogue";
  //   }
  //   console.log("image: ", image);
  //   root.append(image);
  //   document.body.append(root);
  // }
});

const addListeners = () => {
  document
    .getElementById("cursorImage")
    .addEventListener("mousedown", mouseDown, false);
  window.addEventListener("mouseup", mouseUp, false);
  console.log("hi from addListeners");
};

const mouseUp = e => {
  const overlayM = document.getElementById("cursorImage");
  overlayM.style.cursor = "grab";
  window.removeEventListener("mousemove", overlayMove, true);
  console.log("hi from mouseUp");
};

const mouseDown = e => {
  e.preventDefault();
  gMouseDownX = e.clientX;
  gMouseDownY = e.clientY;

  const overlayM = document.getElementById("cursorImage");
  overlayM.style.cursor = "grabbing";

  //The following block gets the X offset (the difference between where it starts and where it was clicked)
  let leftPart = "";
  if (!overlayM.style.left) {
    leftPart += "0px";
  } else {
    //In case this was not defined as 0px explicitly.
    leftPart = overlayM.style.left;
  }
  let leftPos = leftPart.indexOf("px");
  let leftNumString = leftPart.slice(0, leftPos); // Get the X value of the object.
  gMouseDownOffsetX = gMouseDownX - parseInt(leftNumString, 10);

  //The following block gets the Y offset (the difference between where it starts and where it was clicked)
  let topPart = "";
  if (!overlayM.style.top) {
    topPart += "0px";
  } else {
    //In case this was not defined as 0px explicitly.
    topPart = overlayM.style.top;
  }
  let topPos = topPart.indexOf("px");
  let topNumString = topPart.slice(0, topPos); // Get the Y value of the object.
  gMouseDownOffsetY = gMouseDownY - parseInt(topNumString, 10);

  window.addEventListener("mousemove", overlayMove, true);
  console.log("hi from mouseDown");
};

const overlayMove = e => {
  const overlayM = document.getElementById("cursorImage");
  overlayM.style.position = "absolute";
  let topAmount = e.clientY - gMouseDownOffsetY;
  overlayM.style.top = topAmount + "px";
  let leftAmount = e.clientX - gMouseDownOffsetX;
  overlayM.style.left = leftAmount + "px";
  console.log("hi from overlayMove");
};

// potential extra features
// https://editor.p5js.org/p5/sketches/Structure:_Redraw
// https://editor.p5js.org/p5/sketches/Structure:_Create_Graphics
// https://editor.p5js.org/p5/sketches/Form:_Triangle_Strip
// https://editor.p5js.org/p5/sketches/Form:_Bezier
// https://editor.p5js.org/p5/sketches/Arrays:_Array_2d
// https://editor.p5js.org/p5/sketches/Arrays:_Array_Objects
// https://editor.p5js.org/p5/sketches/Control:_Embedded_Iteration
// https://editor.p5js.org/p5/sketches/Image:_Load_and_Display_Image
// https://editor.p5js.org/p5/sketches/Image:_Background_Image
// https://editor.p5js.org/p5/sketches/Image:_Transparency
// https://editor.p5js.org/p5/sketches/Image:_Alpha_Mask
// https://editor.p5js.org/p5/sketches/Image:_Create_Image
// https://editor.p5js.org/p5/sketches/Image:_Pointillism
// https://editor.p5js.org/p5/sketches/Color:_Brightness
// https://editor.p5js.org/p5/sketches/Color:_Lerp_Color
// https://editor.p5js.org/p5/sketches/Math:_distance1d
// https://editor.p5js.org/p5/sketches/Math:_distance2d
// https://editor.p5js.org/p5/sketches/Math:_sinewave
// https://editor.p5js.org/p5/sketches/Math:_additivewave
// https://editor.p5js.org/p5/sketches/Math:_polartocartesian
// https://editor.p5js.org/p5/sketches/Math:_arctangent
// https://editor.p5js.org/p5/sketches/Math:_Interpolate
// https://editor.p5js.org/p5/sketches/Math:_Randomchords
// https://editor.p5js.org/p5/sketches/Math:_Map
// https://editor.p5js.org/p5/sketches/Simulate:_Forces
// https://editor.p5js.org/p5/sketches/Simulate:_Flocking
// https://editor.p5js.org/p5/sketches/Simulate:_GameOfLife
// https://editor.p5js.org/p5/sketches/Simulate:_MultipleParticleSystems
// https://editor.p5js.org/p5/sketches/Simulate:_LSystems
// https://editor.p5js.org/p5/sketches/Simulate:_Spring
// https://editor.p5js.org/p5/sketches/Simulate:_Springs
// https://editor.p5js.org/p5/sketches/Simulate:_SmokeParticleSystem
// https://editor.p5js.org/p5/sketches/Simulate:_SmokeParticleSystem
// https://editor.p5js.org/p5/sketches/Simulate:_Chain
// https://editor.p5js.org/p5/sketches/Simulate:_SnowflakeParticleSystem
// https://editor.p5js.org/p5/sketches/Simulate:_penrose_tiles
// https://editor.p5js.org/p5/sketches/Simulate:_Recursive_Tree
// https://editor.p5js.org/p5/sketches/Simulate:_Mandelbrot
// https://editor.p5js.org/p5/sketches/Simulate:_Koch
// https://editor.p5js.org/p5/sketches/Interaction:_Tickle
// https://editor.p5js.org/p5/sketches/Interaction:_Follow1
// https://editor.p5js.org/p5/sketches/Interaction:_Follow2
// https://editor.p5js.org/p5/sketches/Interaction:_Follow3
// https://editor.p5js.org/p5/sketches/Interaction:_snake
// https://editor.p5js.org/p5/sketches/Interaction:_Wavemaker
// https://editor.p5js.org/p5/sketches/Interaction:_reach1
// https://editor.p5js.org/p5/sketches/Interaction:_reach2
// https://editor.p5js.org/p5/sketches/Interaction:_reach3
// https://editor.p5js.org/p5/sketches/Objects:_Objects_Array
// https://editor.p5js.org/p5/sketches/Objects:_Composite_Objects
// https://editor.p5js.org/p5/sketches/Lights:_Mixture
// https://editor.p5js.org/p5/sketches/Motion:_non_orthogonal_reflection
// https://editor.p5js.org/p5/sketches/Motion:_Bounce
// https://editor.p5js.org/p5/sketches/Motion:_Bouncy_Bubbles
// https://editor.p5js.org/p5/sketches/Motion:_Moving_On_Curves
// https://editor.p5js.org/p5/sketches/Instance_Mode:_Instantiating
// https://editor.p5js.org/p5/sketches/Instance_Mode:_Instance_Container_4
// https://editor.p5js.org/p5/sketches/Dom:_Input_Button
// https://editor.p5js.org/p5/sketches/Dom:_Slider
// https://editor.p5js.org/p5/sketches/Dom:_Modify_DOM
// https://editor.p5js.org/p5/sketches/Dom:_Video
// https://editor.p5js.org/p5/sketches/Dom:_Video_Canvas
// https://editor.p5js.org/p5/sketches/Dom:_Video_Pixels
// https://editor.p5js.org/p5/sketches/Dom:_Drop
// https://editor.p5js.org/p5/sketches/Drawing:_Continuous_Lines
// https://editor.p5js.org/p5/sketches/Drawing:_Pattern
// https://editor.p5js.org/p5/sketches/Drawing:_Pulses
// https://editor.p5js.org/p5/sketches/Transform:_Arm
// https://editor.p5js.org/p5/sketches/Typography:_Letters
// https://editor.p5js.org/p5/sketches/3D:_geometries
// https://editor.p5js.org/p5/sketches/3D:_sine_cosine_in_3D
// https://editor.p5js.org/p5/sketches/3D:_multiple_lights
// https://editor.p5js.org/p5/sketches/3D:_materials
// https://editor.p5js.org/p5/sketches/3D:_textures
// https://editor.p5js.org/p5/sketches/3D:_ray_casting
// https://editor.p5js.org/p5/sketches/3D:_orbit_control
// https://editor.p5js.org/p5/sketches/Input:_Clock
// https://editor.p5js.org/p5/sketches/Input:_Constrain
// https://editor.p5js.org/p5/sketches/Input:_Easing
// https://editor.p5js.org/p5/sketches/Input:_Keyboard
// https://editor.p5js.org/p5/sketches/Input:_Mouse1D
// https://editor.p5js.org/p5/sketches/Input:_Mouse2D
// https://editor.p5js.org/p5/sketches/Input:_MouseIsPressed
// https://editor.p5js.org/p5/sketches/Input:_Mouse_Functions
// https://editor.p5js.org/p5/sketches/Input:_Mouse_Signals
// https://editor.p5js.org/p5/sketches/Input:_Storing_Input
// https://editor.p5js.org/p5/sketches/Sound:_Load_and_Play_Sound
// https://editor.p5js.org/p5/sketches/Sound:_Preload_Sound
// https://editor.p5js.org/p5/sketches/Sound:_soundFormats
// https://editor.p5js.org/p5/sketches/Sound:_Sound_Effect
// https://editor.p5js.org/p5/sketches/Sound:_Amplitude_Analysis
// https://editor.p5js.org/p5/sketches/Sound:_Note_Envelope
// https://editor.p5js.org/p5/sketches/Sound:_Oscillator_Waveform
// https://editor.p5js.org/p5/sketches/Sound:_Live_Input
// https://editor.p5js.org/p5/sketches/Sound:_FFT_Spectrum
// https://editor.p5js.org/p5/sketches/Sound:_Mic_Threshold
// https://editor.p5js.org/p5/sketches/Sound:_Filter_BandPass
// https://editor.p5js.org/p5/sketches/Sound:_Record_Save
