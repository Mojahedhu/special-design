// [1] Part One
// Make Landing-page's Image Random change
let landingPage = document.querySelector(".landing-page");
let i = 2;
let randomOption = true;
let randomInterval;
function changeBackground() {
  if (randomOption) {
    randomInterval = setInterval(() => {
      landingPage.style.backgroundImage = `url("/imgs/0${i}.jpg")`;

      i++;
      if (i === 6) i = 1;
    }, 1000);
  }
}
// Load The RandomOption Of The backgroundImage Change From The LocalStorage in Case If Not Empty
if (localStorage.background_option !== undefined) {
  randomOption = localStorage.getItem("background_option");
}
if (randomOption === "true" || randomOption === true) {
  changeBackground();
} else {
  document.querySelector(".random-background .yes").classList.remove("active");
  document.querySelector(".random-background .no").classList.add("active");
}

// [2] Part 2
// Add The Spinning Movement To The Gear Icon, And Moving The Setting Box
let toggleSetting = (document.querySelector(
  ".toggle-setting .modification"
).onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-container").classList.toggle("viewed");
});

// [3] Part Three
// Change the value of --main-color From Color Setting
let colorSelection = document.querySelectorAll(".colors-list li");

// Get the Color From LocalStorage If Found
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorSelection.forEach((e) => {
    // remove Active Class From All Li
    e.classList.remove("active");

    // Add Active Class To The Target Li
    if (e.dataset.color === mainColor) e.classList.add("active");
  });
}
// Section To Handel Color Selection
colorSelection.forEach((e) => {
  e.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Save Color To The LocalStorage
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove Active Class From All Li And add it to the required li
    handleActiveClass(e);
  });
});

// [4] Part Four
// Section To Handel Random backgroundImage Selection Between Enable Or Disable And Toggle The Active Class Between Yes And No Button
let RandomSelection = document.querySelectorAll(".random-background span");
RandomSelection.forEach((e) => {
  e.addEventListener("click", (e) => {
    // Remove Active Class From All documentElement and the active class to the required choice
    handleActiveClass(e);
    // Assign Value To the localStorage From random background control menu and either execute the random background or not
    if (e.target.dataset.background === "yes") {
      randomOption = true;
      localStorage.setItem("background_option", randomOption);
      clearInterval(randomInterval);
      changeBackground();
    } else {
      clearInterval(randomInterval);
      randomOption = false;
      localStorage.setItem("background_option", randomOption);
    }
  });
});

// [5] Part Five
//  This Section To Handel Skill Progress Animation When Scrolling To It

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //  Skill Offset Top
  let skillOffsetTop = ourSkills.offsetTop;

  // Skill Outer Height
  let skillOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // window ScrollTop
  let windowScrollTop = this.scrollY;
  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
  if (
    windowScrollTop >
    skillOffsetTop + skillOuterHeight - windowHeight * 1.1
  ) {
    allSkills.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  } else {
    allSkills.forEach((e) => {
      e.style.width = "0";
    });
  }
};

// [6] Section To Handel The Popup Menu of The Gallery
// Select Images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The PopupBox
    let popupBox = document.createElement("box");

    // Add Class Name to The PopupBox
    popupBox.className = "popup-box";

    // Create The Image Of Pop up Box
    let popupImage = document.createElement("img");

    // Set The Image Scrolling
    popupImage.src = img.src;

    // Add Image To The PopupBox
    popupBox.appendChild(popupImage);

    // Append The PopupBox To The Body
    document.body.appendChild(popupBox);

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append Text To The Heading
      imgHeading.appendChild(imgText);

      // Prepend The Heading To The PopupBox
      popupBox.prepend(imgHeading);

      // Create The Close span
      let closeButton = document.createElement(`span`);

      // Create The Close Button Text
      let closeButtonText = document.createTextNode(`x`);

      // Append Text The Close Node
      closeButton.appendChild(closeButtonText);

      // Add Class To The Close Button
      closeButton.className = "close-button";

      // APPend The Close Button To popupBox
      popupBox.appendChild(closeButton);
    }
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// [7] Section Handel The execution of nav bullet bar and main navigation bar of the title menu
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Function Execute the scrolling
function scrollOfNav(selected) {
  selected.forEach((bull) => {
    bull.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
// nav bullets
scrollOfNav(allBullets);

// main nav bar
let allMainNav = document.querySelectorAll(".landing-page .links li a");
scrollOfNav(allMainNav);

// [8]Section To Handel The active class
// Create a generic function
function handleActiveClass(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((event) => {
    event.classList.remove("active");
  });
  // Add Active Class To The Target li
  event.target.classList.add("active");
}

// [9]section to handle the show bullets bullets_option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((e) => {
    e.classList.remove("active");
  });
  if (bulletLocalItem === "unset") {
    bulletContainer.style.display = "unset";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((e) => {
  e.addEventListener(`click`, (e) => {
    if (e.target.dataset.display === "unset") {
      bulletContainer.style.display = "unset";
      localStorage.setItem("bullets_option", "unset");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActiveClass(e);
  });
});

// [9] Section to create reset option

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};

// [10] Section to handle toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");
// Open and close the menu by click on the menu-icon
toggleBtn.onclick = function (e) {
  // stop propagation
  e.stopPropagation();

  this.classList.toggle("menu-active");

  tlinks.classList.toggle("open");
};

// close the menu by clicing anywhere on the screen
// prevent propagation on the menu from the included links
tlinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (
    e.target !== toggleBtn &&
    e.target !== tlinks &&
    tlinks.classList.contains("open")
  ) {
    tlinks.classList.remove("open");
    toggleBtn.classList.remove("menu-active");
  }
});
