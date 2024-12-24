document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#Emergency-Form');
    if (form) {
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
            const service = document.querySelector('#service').value;
                console.log("Selected service:", service);
  
            console.log("The Data from frontend is:", name, phone, email, address, model, description, date, time, service);
             // Check if service is selected
             if (!name || !phone || !email || !address || !date || !time) {
                alert('Please fill in all required fields.');
                return; // Stop the submission process
            }
            if (!service) {
                alert("Please select a service plan.");
                return;
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
                    body: JSON.stringify({ name, phone, email, address, model, description, date, time, service }),
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