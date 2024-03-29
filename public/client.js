// Initial load, similar to componentDidMount in React
function setup() {
  // Turn off standard p5 drawing canvas
  noCanvas();

  // Turn on videoCapture
  var video = createCapture({
    audio: false,
    video: {
      width: 480,
      height: 680
    }
  });
  video.id("cam");
  video.parent("vid");

  // Disable Logo link and reverse camera link(for smartphones)
  const reverse = document.getElementById("reverseCamera");
  reverse.disabled = "true";
  const homeL = document.getElementById("homeLogo");
  homeL.disabled = "true";

  // Geolocation upon site visit
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

      // Store geolocation in lacal storage for 'nearby link' and later DB use
      localStorage.setItem("latlon", JSON.stringify(latlonJson));
    });
  } else {
    () => console.log("Geolocation not available");
  }

  // Image overlay resizing sliders
  const selfieC = document.getElementById("selfieCoach");
  const rangeW = document.getElementById("widthRange");
  const rangeH = document.getElementById("heightRange");
  rangeW.value = selfieC.width;
  rangeH.value = selfieC.height;

  // Immediate flash button
  const button1 = document.getElementById("submit1");
  button1.addEventListener("click", async event => {
    button1.disabled = "true";
    button1.style.opacity = "0.3";
    button1.background = "rgba(0, 255, 0, 0.5)";

    setTimeout(() => {
      // Set up flash signal
      const button1 = document.getElementById("submit1");
      button1.disabled = "true";
      button1.style.opacity = "0.7";
      button1.textContent = `✨`;
      const flash1 = document.getElementById("flash");
      flash1.style.visibility = "visible";

      // Get pixels on camera to canvas
      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const selfieC = document.getElementById("selfieCoach");
      const coachPose = selfieC.src;
      const moodV = document.getElementById("mood").value;
      const mood = moodV;
      const timestamp = Date.now();
      const data = {
        lat,
        lon,
        mood,
        image64,
        coachPose,
        timestamp
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = fetch("/db", options);
    }, 0);

    // Set up return to normal from flash signal
    setTimeout(() => {
      const button1 = document.getElementById("submit1");
      button1.disabled = !button1.disabled;
      button1.background = "#d3d3d3";
      button1.style.opacity = "0.7";
      button1.textContent = `⚡`;
      const flash1 = document.getElementById("flash");
      flash1.style.visibility = "hidden";
    }, 150);
  });

  // Three-second flash button
  const button2 = document.getElementById("submit2");
  button2.addEventListener("click", async event => {
    button2.disabled = "true";
    button2.style.opacity = "0.3";
    button2.background = "rgba(0, 255, 0, 0.5)";

    // Allow flash precursor by changing icon and pic soon after
    setTimeout(() => {
      const button2 = document.getElementById("submit2");
      button2.textContent = `✌`;
    }, 2500);

    setTimeout(() => {
      const button2 = document.getElementById("submit2");
      button2.disabled = "true";
      button2.style.opacity = "0.7";
      button2.textContent = `✨`;
      const flash1 = document.getElementById("flash");
      flash1.style.visibility = "visible";

      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const selfieC = document.getElementById("selfieCoach");
      const coachPose = selfieC.src;
      const moodV = document.getElementById("mood").value;
      const mood = moodV;
      const timestamp = Date.now();
      const data = {
        lat,
        lon,
        mood,
        image64,
        coachPose,
        timestamp
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = fetch("/db", options);
    }, 3000);

    setTimeout(() => {
      const button2 = document.getElementById("submit2");
      button2.disabled = !button2.disabled;
      button2.background = "#d3d3d3";
      button2.style.opacity = "0.7";
      button2.textContent = `⚡`;
      const flash1 = document.getElementById("flash");
      flash1.style.visibility = "hidden";
    }, 3150);
  });

  // Ten-second flash button
  const button3 = document.getElementById("submit3");
  button3.addEventListener("click", async event => {
    button3.disabled = "true";
    button3.style.opacity = "0.3";
    button3.background = "rgba(0, 255, 0, 0.5)";

    setTimeout(() => {
      const button3 = document.getElementById("submit3");
      button3.textContent = `✌`;
    }, 9500);

    setTimeout(() => {
      const button3 = document.getElementById("submit3");
      button3.disabled = "true";
      button3.style.opacity = "0.7";
      button3.textContent = `✨`;
      const flash1 = document.getElementById("flash");
      flash1.style.visibility = "visible";

      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const selfieC = document.getElementById("selfieCoach");
      const coachPose = selfieC.src;
      const moodV = document.getElementById("mood").value;
      const mood = moodV;
      const timestamp = Date.now();
      const data = {
        lat,
        lon,
        mood,
        image64,
        coachPose,
        timestamp
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      const response = fetch("/db", options);
    }, 10000);

    setTimeout(() => {
      const button3 = document.getElementById("submit3");
      button3.disabled = !button3.disabled;
      button3.background = "#d3d3d3";
      button3.style.opacity = "0.7";
      button3.textContent = `⚡`;
      const flash1 = document.getElementById("flash");
      flash1.style.visibility = "hidden";
    }, 10150);
  });

  getData();

  async function getData() {
    const response = await fetch("/db");
    const data2 = await response.json();

    // Grab current location
    const latlonString = localStorage.getItem("latlon");
    const latlonArr = JSON.parse(latlonString);
    const { lat, lon } = latlonArr[0];

    // Account for negative coordinates
    let latHigh;
    let latLow;
    if (lat > 0) {
      latHigh = parseFloat(lat) + 0.0001;
      latLow = parseFloat(lat) - 0.0001;
    } else {
      latHigh = parseFloat(lat) - 0.0001;
      latLow = parseFloat(lat) + 0.0001;
    }

    if (lon > 0) {
      lonHigh = parseFloat(lon) - 0.0001;
      lonLow = parseFloat(lon) + 0.0001;
    } else {
      lonHigh = parseFloat(lon) + 0.0001;
      lonLow = parseFloat(lon) - 0.0001;
    }

    for (item of data2) {
      // Only display pics that were taken within ~1 foot from current camera location
      if (item.lat < latHigh && item.lat > latLow) {
        if (item.lon < lonHigh && item.lon > lonLow) {
          const root = document.createElement("div");
          const card = document.createElement("div");
          const mood = document.createElement("div");
          const image = document.createElement("img");
          const selfieC = document.createElement("img");
          const date = document.createElement("div");
          const geo = document.createElement("div");

          card.style.backgroundColor = "#d3d3d3";
          card.style.borderRadius = "15px";
          card.style.padding = "10px";
          card.style.margin = "10px";
          card.style.width = "800px";
          mood.textContent = `${item.mood}` || "mood";
          mood.style.textAlign = "center";
          mood.style.fontSize = "18px";
          mood.style.fontWeight = "bold";
          mood.style.padding = "10px";
          mood.style.textShadow = "-1px -1px 0px #00e6e6, 1px 1px 0px #E14E65";
          geo.textContent = `${item.lat}°, ${item.lon}°`;
          const dateString = new Date(item.timestamp).toLocaleString();
          date.textContent = dateString;
          image.src = item.image64;
          image.alt =
            item.mood || "vogue" + Math.floor(Math.random() * 100 + 1);
          selfieC.src = item.coachPose;
          selfieC.alt = Math.floor(Math.random() * 100 + 1);
          selfieC.id = "resizeClone1";
          card.append(mood, image, selfieC, date, geo);
          root.append(card);
          document.body.append(root);
        }
      }
    }
    console.log("data2: ", data2);
  }
}

// Unsplash model fetch and storage in localStorage
const callFetch = fetch("/api")
  .then(response => {
    console.log("response ok?: ", response.ok);
    return response.json();
  })
  .then(data => {
    const unsplashJSON = JSON.stringify(data);
    localStorage.setItem("unsplashModels", unsplashJSON);
  });

const collectionFunction = () => {
  document.body.scrollTop = 900; // for Safari
  document.documentElement.scrollTop = 900; // For Chrome, Firefox, IE, and Opera
};

// New Coach event listener
const buttonCoach = document.getElementById("newCoach");
buttonCoach.addEventListener("click", event => {
  const unsplashString = localStorage.getItem("unsplashModels");
  const picArr = JSON.parse(unsplashString);
  const quickMaths = Math.floor(Math.random(picArr.length) * picArr.length);
  const oneRandomPic = picArr[quickMaths];
  const image = document.getElementById("selfieCoach");
  const altDescription = document.getElementById("figCap");
  image.src = oneRandomPic.urls.regular + ".png";
  image.title = oneRandomPic.alt_description;
  if (oneRandomPic.alt_description) {
    altDescription.textContent = oneRandomPic.alt_description;
  } else {
    altDescription.textContent = "vogue";
  }
});

// Flip Camera event listener
const buttonFlipCamera = document.getElementById("flipCamera");
buttonFlipCamera.addEventListener("click", event => {
  const camera = document.getElementById("cam");
  if (camera.width === 480) {
    const camInit = createCapture(
      {
        audio: false,
        video: {
          width: 640,
          height: 480
        }
      },
      function() {
        console.log("iPhone/Android front camInit ready.");
      }
    );
    camera.remove();
    camInit.id("cam");
    camInit.parent("vid");
  } else {
    const camInit = createCapture(
      {
        audio: false,
        video: {
          width: 480,
          height: 640
        }
      },
      function() {
        console.log("iPhone/Android front camInit ready.");
      }
    );
    camera.remove();
    camInit.id("cam");
    camInit.parent("vid");
  }
});

// Reverse Camera event listener(disabled until smartphone integration)
const buttonReverseCamera = document.getElementById("reverseCamera");
buttonReverseCamera.addEventListener("click", event => {
  const video = createCapture(
    {
      audio: false,
      video: {
        facingMode: {
          exact: "environment"
        },
        width: 640,
        height: 480
      }
    },
    function() {
      console.log("reversVideo on iPhone/Android ready.");
    }
  );
  video.elt.setAttribute("playsinline", "");
  // video.hide();
  video.size(640, 480);
  canvas = createCanvas(640, 480);
  function draw() {
    image(video, 0, 0);
  }
});

// Ghost overlay event listener and mouse event-listening init
const buttonOverlay = document.getElementById("overlayCoach");
buttonOverlay.addEventListener("click", event => {
  const selfieC = document.getElementById("selfieCoach");
  const image = document.createElement("img");
  const buttonAutoWidth = document.getElementById("autoWidth");
  const buttonAutoHeight = document.getElementById("autoHeight");

  // Remove old image ghost or enable auto-resize buttons
  if (document.getElementById("cursorImage")) {
    const elem = document.getElementById("cursorImage");
    elem.parentNode.removeChild(elem);
  } else {
    buttonAutoWidth.disabled = !buttonAutoWidth.disabled;
    buttonAutoHeight.disabled = !buttonAutoHeight.disabled;
  }

  image.src = selfieC.src;
  image.id = "cursorImage";
  image.style.opacity = "0.5";
  image.style.cursor = "grab";
  image.width = selfieC.width;
  image.height = selfieC.height;
  image.style.ondragstart = "return false;";

  const logReelPosition = document.getElementById("logReel");
  logReelPosition.append(image);

  addListeners();
});

// Automatic scaling of width event listener
const buttonAutoWidth = document.getElementById("autoWidth");
buttonAutoWidth.addEventListener("click", async event => {
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  const ratioWH = selfieC.width / selfieC.height;
  overlayM.width = overlayM.height * ratioWH;
});

// Automatic scaling of height event listener
const buttonAutoHeight = document.getElementById("autoHeight");
buttonAutoHeight.addEventListener("click", async event => {
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  const ratioHW = selfieC.height / selfieC.width;
  overlayM.height = overlayM.width * ratioHW;
});

// slider opacity event listener
const rangeOpacityRangeDiv = document.getElementById("opacityRangeDiv");
rangeOpacityRangeDiv.addEventListener("click", async event => {
  const sliderOpacity = document.getElementById("opacityRange");
  const overlayM = document.getElementById("cursorImage");
  const rangeO = document.getElementById("opacityRange");
  sliderOpacity.max = 100;
  overlayM.style.opacity = sliderOpacity.value / 100;
});

// slider width event listener
const rangeWidthRangeDiv = document.getElementById("widthRangeDiv");
rangeWidthRangeDiv.addEventListener("click", async event => {
  const sliderWidth = document.getElementById("widthRange");
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  sliderWidth.max = selfieC.width;
  overlayM.width = sliderWidth.value * 2;
});

// slider height event listener
const rangeHeightRangeDiv = document.getElementById("heightRangeDiv");
rangeHeightRangeDiv.addEventListener("click", async event => {
  const sliderHeight = document.getElementById("heightRange");
  const selfieC = document.getElementById("selfieCoach");
  const overlayM = document.getElementById("cursorImage");
  sliderHeight.max = selfieC.height;
  overlayM.height = sliderHeight.value * 2;
});

// Overlay mouse event listeners
const addListeners = () => {
  document
    .getElementById("cursorImage")
    .addEventListener("mousedown", mouseDown, false);
  window.addEventListener("mouseup", mouseUp, false);
};

// Overlay mouse event listeners
const mouseUp = e => {
  const overlayM = document.getElementById("cursorImage");
  overlayM.style.cursor = "grab";
  window.removeEventListener("mousemove", overlayMove, true);
};

// Overlay mouse event listeners
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
};

// Overlay mouse event listeners
const overlayMove = e => {
  const overlayM = document.getElementById("cursorImage");
  overlayM.style.position = "absolute";
  let topAmount = e.clientY - gMouseDownOffsetY;
  overlayM.style.top = topAmount + "px";
  let leftAmount = e.clientX - gMouseDownOffsetX;
  overlayM.style.left = leftAmount + "px";
};

// Discover Nearby Locations event listener
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
