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

  const button = document.getElementById("submit");
  button.addEventListener("click", async event => {
    video.loadPixels();
    const mood = document.getElementById("mood").value;
    const image64 = video.canvas.toDataURL();
    const data = { lat, lon, mood, image64 };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);
  });
}
