const uploadBox = document.querySelector(".upload-box");

const previewImg = document.querySelector("img");

fileInput = uploadBox.querySelector("input");
widthInput = document.querySelector(".width input");
heightInput = document.querySelector(".height input");
ratiotInput = document.querySelector(".ratio input");
qualityInput = document.querySelector(".quality input");

downloadbtn = document.querySelector(".download-btn");

let ogImageRatio;
const loadfile = (e) => {
  //getting first user selected file
  const file = e.target.files[0];
  //return if user hasn't selected sny file
  if (!file) return;
  //creates a URL of the passed object
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;

    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;

    //once img loaded
    document.querySelector(".wrapper").classList.add("active");
  });
};

widthInput.addEventListener("keyup", () => {
  //getting height according to the ratio checkbox status
  const height = ratiotInput.checked
    ? widthInput.value / ogImageRatio
    : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  //getting width according to the ratio checkbox status
  const width = ratiotInput.checked
    ? heightInput.value * ogImageRatio
    : widthInput.value;
  widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
  console.log("in resize");
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");
  // if quality checkbox is checked, pass 0.7 to imgQuality else pass 1.0
  // 1.0 is 100% quality where 0.7 is 70% of total. you can pass from 0.1 - 1.0
  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  //setting canvas height & width according to the input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  //draw user selected image onto the canvas
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  // passing current time as download value
  a.download = new Date().getTime();
  // clicking <a> element so the file download
  a.click();
};

downloadbtn.addEventListener("click", resizeAndDownload);

fileInput.addEventListener("change", loadfile);

uploadBox.addEventListener("click", () => fileInput.click());
