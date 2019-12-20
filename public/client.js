function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(300, 260);

  let lat, lon;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;
    });
  } else {
    () => console.log("Geolocation not available");
  }

  const callFetch = fetch("/api")
    .then(response => {
      console.log("response ok?: ", response.ok);
      return response.json();
    })
    .then(data => {
      const unsplashJSON = JSON.stringify(data);
      localStorage.setItem("unsplashModels", unsplashJSON);
    });

  const buttonCoach = document.getElementById("newCoach");
  buttonCoach.addEventListener("click", event => {
    const unsplashString = localStorage.getItem("unsplashModels");
    const picArr = JSON.parse(unsplashString);
    const quickMaths = Math.floor(Math.random(picArr.length) * picArr.length);
    const oneRandomPic = picArr[quickMaths];
    // const image = document.createElement("img");
    // image.src = oneRandomPic.urls.thumb + ".png";
    const image = document.getElementById("selfieCoach");
    const altDescription = document.getElementById("altD");
    image.src = oneRandomPic.urls.regular + ".png";
    if (oneRandomPic.alt_description) {
      altDescription.textContent = oneRandomPic.alt_description;
    } else {
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

  const button = document.getElementById("submit");
  button.addEventListener("click", async event => {
    video.loadPixels();
    const coachPose = document.getElementById("selfieCoach").src;
    const mood = document.getElementById("mood").value;
    const image64 = video.canvas.toDataURL();
    const data = { lat, lon, mood, image64, coachPose };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const response = await fetch("/db", options);
    const json2 = await response.json();
    console.log("submitButton json2: ", json2);
  });
}
