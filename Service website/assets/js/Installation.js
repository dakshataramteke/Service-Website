
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#InstallationForm');
    if (form) {
        const dateInput = document.querySelector('#date');
        const timeInput = document.querySelector('#time');

        // Open date picker on focus
        dateInput.addEventListener('focus', () => {
            dateInput.showPicker(); // This method is supported in some browsers
        });

        // Open time picker on focus
        timeInput.addEventListener('focus', () => {
            timeInput.showPicker(); // This method is supported in some browsers
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.querySelector('#name').value.trim();
            const phone = document.querySelector('#phone').value.trim();
            const email = document.querySelector('#email').value.trim();
            const address = document.querySelector('#address').value.trim();
            const model = document.querySelector('#model').value.trim();
            const description = document.querySelector('#description').value.trim();
            const date = document.querySelector('#date').value;
            const time = document.querySelector('#time').value;

            // Validation: Check if all required fields are filled
            if (!name || !phone || !email || !address || !date || !time) {
                alert('Please fill in all required fields.');
                return; // Stop the submission process
            }

            // Pattern validation for name (only letters and whitespace)
            const namePattern = /^[a-zA-Z\s]+$/; // Changed to require at least one character
            if (!namePattern.test(name)) {
                alert("Invalid name. Please use only letters and whitespace.");
                return; // Stop the submission process
            }

            // Pattern validation for email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Invalid Email. Please use a valid email address that includes '@' and a domain.");
                return; // Stop the submission process
            }

            // Pattern validation for phone number (exactly 10 digits)
            const phonePattern = /^\d{10}$/; // Ensures exactly 10 digits
            if (!phonePattern.test(phone)) {
                alert('Invalid phone number. Please enter a valid 10-digit phone number.');
                return; // Stop the submission process
            }

            // Confirmation alert before submitting
            const confirmSubmission = confirm('Are you sure you want to submit the data?');
            if (!confirmSubmission) {
                return; // Stop the submission process if the user cancels
            }

            // Proceed to fetch
            try {
                const response = await fetch('http://localhost:3000/RO_Installation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, email, address, model, description, date, time }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Service request received:', data);
                    alert('Your data has been saved successfully!');
                    form.classList.remove("was-validated");

                    // Reset the form
                    form.reset();
                } else {
                    console.error('Error submitting request:', response.statusText);
                }
            } catch (error) {
                console.error('Request error:', error);
            }
        });
    } else {
        console.error('Form not found');
    }
});