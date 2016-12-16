const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(localMediaStream => {
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch(err => {
    console.log('Have you enabled your webcam on this site?', err);
  });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // Change them around
    pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // put them back in
    ctx.putImageData(pixels, 0, 0);
  }, 10);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'thing');
  link.innerHTML = `<img src=${data} alt="person" /> `
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i=0; i < pixels.data.length; i+=4) {
    // mess with rgb values
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i=0; i < pixels.data.length; i+=4) {
    // mess with rgb values
    pixels.data[i - 100] = pixels.data[i + 0]; //red
    pixels.data[i + 500] = pixels.data[i + 1]; //green
    pixels.data[i - 550] = pixels.data[i + 2]; //blue
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
