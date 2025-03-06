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


// adapted with chat gpt to add animation 

// const subHeads = ['DEEP LABOUR', 'SHARING', 'CO-AUTHORSHIP', 'METHODICAL', 'SURVIVAL'];
// let displayIdx = 0;

// function cycleWords() {
//     const element = document.getElementById('dynamic-sub-head');
    
//     // Add the exit animation (move up + fade out)
//     element.classList.add('fade-up-out');
    
//     setTimeout(() => {
//         // Change the text after animation completes
//         element.textContent = subHeads[displayIdx];

//         // Reset position to slightly below and fade in
//         element.classList.remove('fade-up-out');
//         element.classList.add('fade-up-in');

//         displayIdx = (displayIdx + 1) % subHeads.length; // Loop text

//         setTimeout(() => {
//             element.classList.remove('fade-up-in'); // Remove class after animation
//         }, 500);
//     }, 500); // Matches fade-out duration
// }

// // Run every 2 seconds
// setInterval(cycleWords, 2000);


// testing new code for index circulating text gathering is

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".flex-container div");

    // Set initial opacity for all items
    items.forEach((item, index) => {
        item.style.opacity = index === 0 ? "1" : "0.1"; 
    });

    function rotateOrder() {
        items.forEach((item) => {
            let currentOrder = parseInt(item.style.order);
            let newOrder = currentOrder === 1 ? items.length : currentOrder - 1;
            item.style.order = newOrder;

            // Set opacity based on new order
            item.style.opacity = newOrder === 1 ? "1" : "0.1";
        });
    }

    // Run the function every 2 seconds (adjust as needed)
    setInterval(rotateOrder, 2000);
});
