let template = new Image();
template.crossOrigin = "anonymous";
template.src = "image.png";
console.log("Loading template image from:", template.src);

template.onload = function () {
  console.log("Template image loaded successfully.");
};

function generateCard() {
  console.log("Generating card...");

  let canvas = document.getElementById("idCardCanvas");
  let ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!template.complete) {
    console.error("Error: Template image not loaded yet.");
    return;
  }

  ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
  console.log("Template drawn on canvas.");

  let name = document.getElementById("name").value;
  let userId = Math.floor(Math.random() * 9000000) + 100000000;
  let dob = document.getElementById("dob").value;
  let email = document.getElementById("email").value;
  let userCode = Math.floor(Math.random() * 90000) + 10000;

  console.log("User Input Data:", { name, userId, dob, email, userCode });

  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText(name, 262, 250);
  ctx.font = "19px Arial";
  ctx.fillText(userId, 48, 345);
  ctx.fillText(dob, 48, 420);
  ctx.fillText(email, 320, 420);
  ctx.fillText(userCode, 320, 345);

  console.log("Text drawn on canvas.");

  let profilePic = document.getElementById("profilePic").files[0];
  if (profilePic) {
    let reader = new FileReader();
    reader.onload = function (event) {
      let img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        let size = 194;
        let x = 30,
          y = 84;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, size, size);
        ctx.restore();

        console.log("Profile picture drawn.");
      };
    };
    reader.readAsDataURL(profilePic);
  } else {
    console.warn("No profile picture uploaded.");
  }
}

function downloadCard() {
  let canvas = document.getElementById("idCardCanvas");

  canvas.toBlob(function (blob) {
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "kartu_nama.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, "image/png");
}