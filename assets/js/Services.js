document.addEventListener('DOMContentLoaded', () => {
    const forms = [
        { id: 'Emergency-Form', endpoint: 'http://localhost:3000/Emergency_Repair' },
        { id: 'Water-Form', endpoint: 'http://localhost:3000/Water_Quality_Testing' },
        { id: 'InstallationForm', endpoint: 'http://localhost:3000/RO_Installation' },
        { id: 'Maintenance-Form', endpoint: 'http://localhost:3000/RO_Maintenance' }
    ];


    // Function to handle service link clicks
function handleServiceClick(serviceId) {
    const form = forms.find(f => f.id === serviceId);
    if (form) {
        window.location.href = form.endpoint; // Redirect to the endpoint
    }
}

    forms.forEach(({ id, endpoint }) => {
        const form = document.querySelector(`#${id}`);
        if (form) {
            initializeForm(form, endpoint);
        } else {
            console.error(`Form with ID ${id} not found`);
        }
    });
});

function initializeForm(form, endpoint) {
    const dateInput = form.querySelector('#date');
    const timeInput = form.querySelector('#time');
    const errorMessage = form.querySelector('#errorMessage'); // Assuming you have an error message element

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

    // Set time selection from 10 AM to 10 PM for specific forms
    if (form.id === 'Water-Form') {
        timeInput.setAttribute('min', '10:00'); // Minimum time: 10 AM
        timeInput.setAttribute('max', '22:00'); // Maximum time: 10 PM
    }

    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);

        // Check if the selected date is within the allowed range
        if (selectedDate < today || selectedDate > nextYear) {
            errorMessage.textContent = `Please select a date between today and ${nextYearString}.`;
            dateInput.value = ''; // Clear the input
        } else {
            errorMessage.textContent = ''; // Clear the error message
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const email = form.querySelector('#email').value.trim();
        const address = form.querySelector('#address').value.trim();
        const model = form.querySelector('#model').value.trim();
        const description = form.querySelector('#description').value.trim();
        const date = dateInput.value; // Use dateInput directly
        const time = timeInput.value; // Get the raw time input value
        const service = form.querySelector('#service') ? form.querySelector('#service').value : null; // Optional service field

        // Validation: Check if all required fields are filled
        if (!name || !phone || !email || !address || !date || !time) {
            alert('Please fill in all required fields.');
            return; // Stop the submission process
        }

        // Check if the time is within the allowed range for Water-Form
        if (form.id === 'Water-Form') {
            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM format
            if (!timePattern.test(time) || time < '10:00' || time > '22:00') {
                alert('Invalid time. Please select a time between 10:00 AM and 10:00 PM.');
                return; // Stop the submission process
            }
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
            const timeIn24HourFormat = convertTo24HourFormat(time); // Convert time if necessary
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, address, model, description, date, time: timeIn24HourFormat, service }),
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
}

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

