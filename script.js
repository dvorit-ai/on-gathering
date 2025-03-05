/* make the navbar sticky */ 

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");

    // Calculate navbar's position relative to the document, not just its parent
    const navOffset = navbar.getBoundingClientRect().top + window.scrollY - 50;

    window.addEventListener("scroll", function () {
        if (window.scrollY >= navOffset) {
            navbar.classList.add("fixed");
        } else {
            navbar.classList.remove("fixed");
        }
    });
});


/* code pulled from https://stackoverflow.com/questions/75828238/using-javascript-to-have-a-text-line-cycle-between-various-text
cycles the text on the initial page */


// const subHeads = ['SURVIVAL', 'DEEP LABOUR', 'SHARING', 'CO-AUTHORSHIP', 'METHODICAL'];
// let displayIdx = 0;

// setInterval(() => {
//   document.getElementById('dynamic-sub-head').innerHTML = subHeads[displayIdx];
//   displayIdx += 1;
//   if (displayIdx >= subHeads.length) {
//     displayIdx = 0;
//   }
// }, 1000);

// adapted with chat gpt to add animation 

const subHeads = ['DEEP LABOUR', 'SHARING', 'CO-AUTHORSHIP', 'METHODICAL', 'SURVIVAL'];
let displayIdx = 0;

function cycleWords() {
    const element = document.getElementById('dynamic-sub-head');
    
    // Add the exit animation (move up + fade out)
    element.classList.add('fade-up-out');
    
    setTimeout(() => {
        // Change the text after animation completes
        element.textContent = subHeads[displayIdx];

        // Reset position to slightly below and fade in
        element.classList.remove('fade-up-out');
        element.classList.add('fade-up-in');

        displayIdx = (displayIdx + 1) % subHeads.length; // Loop text

        setTimeout(() => {
            element.classList.remove('fade-up-in'); // Remove class after animation
        }, 500);
    }, 500); // Matches fade-out duration
}

// Run every 2 seconds
setInterval(cycleWords, 2000);

