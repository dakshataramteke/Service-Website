// // Contact
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector(".submit-form");
//   if (form) {
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const name = document.querySelector("#name").value.trim();
//       const email = document.querySelector("#email").value.trim();
//       const subject = document.querySelector("#subject").value.trim();
//       const message = document
//         .querySelector('textarea[name="message"]')
//         .value.trim();

//       // Validation: Check if all required fields are filled
//       if (!name || !email || !subject || !message) {
//         alert("Please fill in all required fields.");
//         return; // Stop the submission process
//       }

//       // Pattern validation for name (only letters and whitespace)
//       const namePattern = /^[a-zA-Z\s]*$/;
//       if (!namePattern.test(name)) {
//         alert("Invalid name. Please use only  characters.");
//         return; // Stop the submission process
//       }
      
//       // For Email
//       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailPattern.test(email)) {
//         alert(
//           "Invalid Email. Please use a valid email address that includes '@' and a domain."
//         );
//         return;
//       }

//       // Confirmation alert before submitting
//       const confirmSubmission = confirm(
//         "Are you sure you want to submit the data?"
//       );
//       if (!confirmSubmission) {
//         return; // Stop the submission process if the user cancels
//       }

//       console.log("The Data from frontend is:", name, email, subject, message);

//       // Proceed to fetch
//       try {
//         const response = await fetch("http://localhost:3000/contactus", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name, email, subject, message }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Service request received:", data);

//           // Show alert message for successful submission
//           alert("Your Form submitted successfully!");
//           form.classList.remove("was-validated");

//           // Reset the form
//           form.reset();
//         } else {
//           console.error("Error submitting request:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Request error:", error);
//       }
//     });
//   } else {
//     console.error("Form not found");
//   }
// });


// Contact
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".submit-form");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document
          .querySelector('textarea[name="message"]')
          .value.trim();
  
        // Validation: Check if all required fields are filled
        if (!name || !email || !subject || !message) {
          alert("Please fill in all required fields.");
          return; // Stop the submission process
        }
  
        // Pattern validation for name (only letters and whitespace)
        const namePattern = /^[a-zA-Z\s]*$/;
        if (!namePattern.test(name)) {
          alert("Invalid name. Please use only letters and whitespace.");
          return; // Stop the submission process
        }
        
        // For Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          alert(
            "Invalid Email. Please use a valid email address that includes '@' and a domain."
          );
          return; // Stop the submission process
        }
  
        // Confirmation alert before submitting
        const confirmSubmission = confirm(
          "Are you sure you want to submit the data?"
        );
        if (!confirmSubmission) {
          return; // Stop the submission process if the user cancels
        }
  
        // If all validations pass, programmatically submit the form
        await submitForm(name, email, subject, message);
      });
    } else {
      console.error("Form not found");
    }
  });
  
  // Function to handle form submission
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
  
        // Show alert message for successful submission
        alert("Your Form submitted successfully!");
        const form = document.querySelector(".submit-form");
        form.classList.remove("was-validated");
  
        // Reset the form
        form.reset();
      } else {
        console.error("Error submitting request:", response.statusText);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  }