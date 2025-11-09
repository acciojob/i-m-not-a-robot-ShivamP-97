//your JS code here. If required.
const imageContainer = document.getElementById("image-container");
const buttonsContainer = document.getElementById("buttons");
const message = document.getElementById("h");

const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

let selectedImages = [];
let allImages = [];

function initialize() {
  imageContainer.innerHTML = "";
  buttonsContainer.innerHTML = "";
  selectedImages = [];

  const randomIndex = Math.floor(Math.random() * imageClasses.length);
  const repeatedImage = imageClasses[randomIndex];

  allImages = [...imageClasses, repeatedImage];

  allImages.sort(() => Math.random() - 0.5);

  allImages.forEach((imgClass, i) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.dataset.index = i;
	img.setAttribute("data-ns-test", imgClass);
    img.style.cursor = "pointer";

    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });

  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
}

function handleImageClick(img) {
  if (selectedImages.find((el) => el.dataset.index === img.dataset.index))
    return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length === 1) renderResetButton();

  if (selectedImages.length === 2) renderVerifyButton();
}

function renderResetButton() {
  if (!document.getElementById("reset")) {
    const resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", resetState);
    buttonsContainer.appendChild(resetBtn);
  }
}

function renderVerifyButton() {
  if (!document.getElementById("verify")) {
    const verifyBtn = document.createElement("button");
    verifyBtn.id = "btn";
    verifyBtn.textContent = "Verify";
    verifyBtn.addEventListener("click", verifySelection);
    buttonsContainer.appendChild(verifyBtn);
  }
}

function resetState() {
  initialize();
}

function verifySelection() {
  const verifyBtn = document.getElementById("verify");
  if (verifyBtn) verifyBtn.remove();

  const prevMsg = document.getElementById("para");
  if (prevMsg) prevMsg.remove();

  const p = document.createElement("p");
  p.id = "para";

  if (selectedImages[0].className === selectedImages[1].className) {
    p.textContent = "You are a human. Congratulations!";
  } else {
    p.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  buttonsContainer.appendChild(p);
}

initialize();
