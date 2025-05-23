(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });


// Validations 

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  });


})()

// Contact US 

document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Submission
  const contactForm = document.querySelector(".submit-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const subject = document.querySelector("#subject").value.trim();
      const message = document.querySelector('textarea[name="message"]').value.trim();

      // Validation: Check if all required fields are filled
      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Pattern validation for name (only letters and whitespace)
      const namePattern = /^[a-zA-Z\s]*$/;
      if (!namePattern.test(name)) {
        alert("Invalid name. Please use only letters and whitespace.");
        return;
      }

      // For Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Invalid Email. Please use a valid email address that includes '@' and a domain.");
        return;
      }

      // Confirmation alert before submitting
      const confirmSubmission = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to submit the data",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it"
      });

      if (!confirmSubmission.isConfirmed) {
        return; // Stop the submission process if the user cancels
      }

      // If all validations pass, programmatically submit the form
      await submitForm(name, email, subject, message);
    });
  } else {
    console.error("Contact form not found");
  }

  // Subscribe Form Submission
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the default form submission

      const email = document.getElementById('subscribe-email').value.trim(); // Ensure the correct ID is used

      // Email validation regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      console.log(email);
      // Send subscription request using Axios
      try {
        const response = await axios.post("http://localhost:3000/subscribe", {
          email: email
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Subscribed with email:", email);
          Swal.fire({
            title: "Subscribed!",
            text: "You have successfully subscribed.",
            icon: "success"
          });
          subscribeForm.reset(); // Reset the form after successful subscription
        } else {
          console.error("Error subscribing:", response.statusText);
        }
      } catch (error) {
        console.error("Subscription request error:", error);
      }
    });
  } else {
    console.error("Subscribe form not found");
  }
});

// Function to handle contact form submission
async function submitForm(name, email, subject, message) {
  console.log("The Data from frontend is:", name, email, subject, message);

  // Proceed to fetch
  try {
    const response = await fetch("http://localhost:3000/contactus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Service request received:", data);

      const form = document.querySelector(".submit-form");
      form.classList.remove("was-validated");

      // Reset the form
      form.reset();
      Swal.fire({
        title: "Successfully",
        text: "Your Data has been successfully saved",
        icon: "success"
      });
    } else {
      console.error("Error submitting request:", response.statusText);
    }
  } catch (error) {
    console.error("Request error:", error);
  }
}