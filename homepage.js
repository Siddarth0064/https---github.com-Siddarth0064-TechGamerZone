// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Trigger the logo animation
//     const logoTransition = document.querySelector('.logo-transition');
//     logoTransition.style.opacity = '1';

//     // Wait for the animation to complete before navigating
//     setTimeout(() => {
//         window.location.href = 'homepage.html';
//     }, 2000); // Match the duration of the animation (1s)
// });


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.navbar a');
menuIcon.onclick=()=>{
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');

}
// Close the navbar when any nav link is clicked
navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    };
});


// Navigation scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Feedback form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzLQG7iMTgdXxo8ydXq60MYZcholV87aJujFBAKd7FluR8VgNRHYjFSIc9GDky9mpqdPg/exec';
    const feedbackForm = document.forms['submit-feedback-form'];
    const msg = document.getElementById("msg");

    feedbackForm.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(feedbackForm)})
            .then(response => {
                msg.innerHTML = "Message Sent Successfully";
                msg.classList.add("visible");
                feedbackForm.classList.add("hidden");
                setTimeout(() => {
                    msg.classList.remove("visible");
                    feedbackForm.classList.remove("hidden");
                    feedbackForm.reset();
                }, 1500);
            })
            .catch(error => console.error('Error!', error.message));
    });
});
