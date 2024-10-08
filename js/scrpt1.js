document.addEventListener('DOMContentLoaded', function() {
    // URL of the API
    const apiUrl = 'https://example.com/api/contacts'; // replace with your actual API URL
    
    // Function to create a contact item and append it to the contact list
    function createContactItem(contact) {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');
        
        contactItem.innerHTML = `
            <div class="left-end">
                <img src="${contact.profile_picture}" alt="${contact.name}" width="48" height="48">
                <div class="contact-text">
                    <p class="top">${contact.name}</p>
                    <p class="bottom">${contact.gender}, ${contact.age}</p>
                </div>
            </div>
            <div class="right-end">
                <img src="img/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="Transactions" width="18" height="4">
            </div>
        `;
        
        // Append the contact item to the contact list
        document.getElementById('contact-list').appendChild(contactItem);
    }

    // Function to fetch data from the API
    function fetchContactData() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Loop through each contact and create a contact item
                data.forEach(contact => createContactItem(contact));
            })
            .catch(error => console.error('Error fetching contact data:', error));
    }

    // Fetch data when the page loads
    fetchContactData();
});






// Get the context of the canvas
const ctx = document.getElementById('bloodPressureChart').getContext('2d');

// Sample data for blood pressure
const bloodPressureData = {
    labels: ['Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023'],
    datasets: [
        {
            label: 'Systolic',
            data: [120, 130, 135, 140],
            borderColor: '#ff6384',
            fill: false
        },
        {
            label: 'Diastolic',
            data: [80, 85, 82, 78],
            borderColor: '#36a2eb',
            fill: false
        }
    ]
};

// Create the chart
new Chart(ctx, {
    type: 'line',
    data: bloodPressureData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
