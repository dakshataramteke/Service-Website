
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#Water-Form');
    if (form) {
        const dateInput = document.querySelector('#date');
        const timeInput = document.querySelector('#time');
        const errorMessage = document.querySelector('#errorMessage'); 

        // Open date picker on focus
        dateInput.addEventListener('focus', () => {
            dateInput.showPicker(); 
        });

        // Open time picker on focus
        timeInput.addEventListener('focus', () => {
            timeInput.showPicker(); 
        });

        // Get today's date
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Set the min attribute to today's date
        dateInput.setAttribute('min', todayString);

        // Calculate the date one year from today
        const nextYear = new Date();
        nextYear.setFullYear(today.getFullYear() + 1);
        const nextYearString = nextYear.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Set the max attribute to one year from today
        dateInput.setAttribute('max', nextYearString);

        // Set time selection from 10 AM to 10 PM
        timeInput.setAttribute('min', '10:00'); // Minimum time: 10 AM
        timeInput.setAttribute('max', '22:00'); // Maximum time: 10 PM

        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);

            // Check if the selected date is within the allowed range
            if (selectedDate < today || selectedDate > nextYear) {
                errorMessage.textContent = `Please select a date between today and ${nextYearString}.`;
                dateInput.value = ''; 
            } else {
                errorMessage.textContent = ''; 
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.querySelector('#name').value.trim();
            const phone = document.querySelector('#phone').value.trim();
            const email = document.querySelector('#email').value.trim();
            const address = document.querySelector('#address').value.trim();
            const model = document.querySelector('#model').value.trim();
            const description = document.querySelector('#description').value.trim();
            const date = dateInput.value; // Use dateInput directly
            const time = timeInput.value; // Get the raw time input value

            // Validation: Check if all required fields are filled
            if (!name || !phone || !email || !address || !date || !time) {
                alert('Please fill in all required fields.');
                return; // Stop the submission process
            }

            // Check if the time is within the allowed range
            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM format
            if (!timePattern.test(time) || time < '10:00' || time > '22:00') {
                alert('Invalid time. Please select a time between 10:00 AM and 10:00 PM.');
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
                return ; // Stop the submission process
            }

            // Confirmation alert before submitting
            const confirmSubmission = confirm('Are you sure you want to submit the data?');
            if (!confirmSubmission) {
                return; // Stop the submission process if the user cancels
            }

            // Proceed to fetch
            try {
                const response = await fetch('http://localhost:3000/Water_Quality_Testing', {
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

    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${adjustedHour}:${minutes} ${suffix}`;
    }
});