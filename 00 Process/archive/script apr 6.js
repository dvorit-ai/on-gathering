//this is all the websocket functionality.
var socket = io();

socket.on("count", function (num) {
  //console.log(num)

  //if the number of users is anything greater than 10 just set it to 10 for now.
  // if (num > 10) {
  // 	num=10
  // }

  //set the body ID to the number of active users
  document.body.id = "user" + num;

  //update the sidebar texts and loading circles

  document.getElementById("coauthors").textContent =
    num + " co-author's are here";
  document.getElementById("pageload").textContent =
    " ⚠️ " + (10 - num) + " are missing " + "⚠️";

  if (num === 1) {
    document.getElementById("coauthors").textContent =
      num + " co-author is here";
  }

  if (num === 9) {
    document.getElementById("pageload").textContent =
      "⚠️ " + (10 - num) + " is missing " + "⚠️";
  }

  if (num >= 10) {
    document.getElementById("pageload").innerHTML =
      "🎉 Congratulations! <br> All co-authors are present!";
  }

  //the user dots
  document.querySelectorAll(".loading-circle").forEach((element) => {
    element.classList.remove("active");

    if (num >= 10) {
      element.classList.add("user-10");
    } 
  });

  for (let i = 1; i <= num; i++) {
    let el = document.getElementById("lc" + i);
    if (el) {
      el.classList.add("active");
    }
  }

  //the images
  document.querySelectorAll("img").forEach((element) => {
    // Re-add the class if there are exactly 10 users
    if (num === 10) {
      element.classList.add("user-10");
    }
  });

  //remove hide class before 5 users
  document.querySelectorAll("img.user-5").forEach((element) => {
    if (num >= 5) {
      element.classList.remove("hide");
    }
  });

  //hide error images once 5 users
  document.querySelectorAll("img.user-1, #img-1").forEach((element) => {
    if (num >= 5) {
      element.classList.add("hide");
    }
  });

  // adding display:none to the white cover so it always gets hidden
  document.querySelectorAll("#white-cover").forEach((element) => {
    if (num >= 1) {
      element.classList.add("hide");
    }
  });

  // show citation on click once over 9 users
  // and add class to change background color at 10+ users
  document.querySelectorAll(".citation-popup").forEach((citation) => {
    if (num >= 9){
      citation.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    }

    if (num >= 10) {
      citation.classList.add("user-10");
    } else {
      citation.classList.remove("user-10");
    }
  });

  // make info button popup change background color at 10+ users
  document.querySelectorAll("#info-popup").forEach((popup) => {
    if (num >= 10) {
      popup.classList.add("user-10");
    } 
  });

});

// make info button toggle
document.querySelector("#info").addEventListener("click", function() {
  this.classList.toggle("active");
  const button = this.querySelector("#info-button p");
  const currentText = button.textContent;
  button.textContent = currentText === "i" ? "X" : "i";
});

/* make the navbar sticky */

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  // Calculate navbar's position relative to the document, not just its parent
  const navOffset = navbar.getBoundingClientRect().top + window.scrollY - 60;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= navOffset) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }
  });
});

// make the heart button animate
$(".fa-heart-o").on("click", function (e) {
  const { target } = e;
  animateHeart(target);
  socket.emit("heart_clicked"); // Send event to server
});

// Listen for heart clicks from other users
socket.on("heart_clicked", function () {
  const heart = document.querySelector(".fa-heart-o");
  if (heart) {
    animateHeart(heart);
  }
});

// define the function that does the heart animation
function animateHeart(target) {
  const { parentNode } = target;
  const clone = $(target).clone();
  clone[0].style["z-index"] = "0";
  parentNode.prepend(clone[0]);
  clone.addClass("fa-heart animate").removeClass("fa-heart-o");
  setTimeout(() => {
    clone.addClass("fa-heart-o").removeClass("fa-heart animate");
    parentNode.removeChild(clone[0]);
  }, 30001);
}
