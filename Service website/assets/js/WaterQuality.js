document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#Water-Form');
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
  
            // console.log("The Data from frontend is:", name, phone, email, address, model, description, date, time);
             // Validation: Check if all required fields are filled
             if (!name || !phone || !email || !address || !date || !time) {
                alert('Please fill in all required fields.');
                return; // Stop the submission process
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
                    // document.querySelector('.sent-message').style.display = 'block';

                      
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