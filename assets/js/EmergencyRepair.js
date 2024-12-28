
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#Emergency-Form');
    if (form) {
        const dateInput = document.querySelector('#date');
        const timeInput = document.querySelector('#time');

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
            const date = dateInput.value; // Use dateInput directly
            const time = timeInput.value; // Use timeInput directly
            const service = document.querySelector('#service').value;

            // Convert time to 24-hour format
            const timeIn24HourFormat = convertTo24HourFormat(time);

            console.log("Selected service:", service);
            console.log("The Data from frontend is:", name, phone, email, address, model, description, date, timeIn24HourFormat, service);

            // Validation: Check if all required fields are filled
            if (!name || !phone || !email || !address || !date || !time) {
                alert('Please fill in all required fields.');
                return; // Stop the submission process
            }

            // Validate phone number: must be exactly 10 digits
            const phoneRegex = /^\d{10}$/; // Regular expression for exactly 10 digits
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number with exactly 10 digits.');
                return; // Stop the submission process
            }

            // Confirmation alert before submitting
            const confirmSubmission = confirm('Are you sure you want to submit the data?');
            if (!confirmSubmission) {
                return; // Stop the submission process if the user cancels
            }

            // Proceed to fetch
            try {
                const response = await fetch('http://localhost:3000/Emergency_Repair', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, email, address, model, description, date, time: timeIn24HourFormat, service }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Service request received:', data);
                    
                    // Update the alert message
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

function convertTo24HourFormat(time) {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12; // Convert PM hours to 24-hour format
    } else if (modifier === 'AM' && hours === '12') {
        hours = '00'; // Convert 12 AM to 00 hours
    }

    return `${hours}:${minutes}:00`; // Return in HH:MM:SS format
}

function selectService(plan) {
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) {
        serviceSelect.value = plan; // Set the selected value to the plan
    }
}