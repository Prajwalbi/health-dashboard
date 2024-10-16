const hamberger = document.querySelector(".hamberger");
const navMenu = document.querySelector(".ul-middle");
 
hamberger.addEventListener("click", () => {
    hamberger.classList.toggle("active");
    navMenu.classList.toggle("active");
})


document.addEventListener('DOMContentLoaded', function(){
    const apiurl = 'https://fedskillstest.coalitiontechnologies.workers.dev';
    let username = 'coalition';
    let password = 'skills-test';
    let auth = btoa(`${username}:${password}`);
    function createContactItem(contact){
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

        document.getElementById('contact-list').appendChild(contactItem);
    }

    function createGraph(bloodPressureData) {
        const ctx = document.getElementById('bloodPressureChart').getContext('2d');

        // Extract systolic and diastolic data from the API response
        const labels = bloodPressureData.map(entry => {
            let month = entry.month;
            month = month.substring(0, 3);
            let year = entry.year;
            return month + ", " + year; 
        }).slice(0,6);
        const systolicData = bloodPressureData.map(entry => entry.blood_pressure.systolic.value).slice(0,6);
        const diastolicData = bloodPressureData.map(entry => entry.blood_pressure.diastolic.value).slice(0,6);
        const respiratoryRateValue = bloodPressureData[0].respiratory_rate.value + " bpm";
        const respiratoryRateLevels = bloodPressureData[0].respiratory_rate.levels;
        const temperatureValue = bloodPressureData[0].temperature.value + "°F";
        const temperatureLevels = bloodPressureData[0].temperature.levels;
        const heartRateValue = bloodPressureData[0].heart_rate.value + " bpm";
        const heartRateLevels = bloodPressureData[0].heart_rate.levels;
    


        // Calculate averages
        const systolicAvg = systolicData.reduce((a, b) => a + b) / systolicData.length;
        const diastolicAvg = diastolicData.reduce((a, b) => a + b) / diastolicData.length;

        // Update statistics in the UI
        // const latestSystolic = systolicData[systolicData.length - 1];
        // const latestDiastolic = diastolicData[diastolicData.length - 1];
        const latestSystolic = systolicData[0];
        const latestDiastolic = diastolicData[0];

        // document.getElementById('point-systolic').textContent = latestSystolic;
        // document.getElementById('point-diastolic').textContent = latestDiastolic;

        document.getElementById('systolicValue').textContent = latestSystolic;
        document.getElementById('diastolicValue').textContent = latestDiastolic;

        document.getElementById('systolicStatus').textContent = latestSystolic > systolicAvg ? 'Higher than Average' : 'Lower than Average';
        document.getElementById('diastolicStatus').textContent = latestDiastolic > diastolicAvg ? 'Higher than Average' : 'Lower than Average';

        document.getElementById("respiratoryRateValue").textContent = respiratoryRateValue;
        document.getElementById("respiratoryRateLevels").textContent = respiratoryRateLevels;
        document.getElementById("temperatureValue").textContent = temperatureValue;
        document.getElementById("temperatureLevels").textContent = temperatureLevels;
        document.getElementById("heartRateValue").textContent = heartRateValue;
        document.getElementById("heartRateLevels").textContent = heartRateLevels;

        // Create or update the chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Systolic',
                    data: systolicData,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    fill: true,
                    tension: 0.3
                }, {
                    label: 'Diastolic',
                    data: diastolicData,
                    borderColor: '#6b6bff',
                    backgroundColor: 'rgba(107, 107, 255, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 180,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    function createDiagnosticList(diagnosticList) {
        const tblContentBody = document.getElementById("tbl-content-body");
        
        tblContentBody.innerHTML = '';
    
        diagnosticList.forEach(data => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            const descriptionCell = document.createElement('td');
            const statusCell = document.createElement('td');
            
            nameCell.textContent = data.name;
            descriptionCell.textContent = data.description;
            statusCell.textContent = data.status;
            
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(statusCell);
            
            tblContentBody.appendChild(row);
        });
    }

    function setProfileInfo(data){
        document.getElementById("patient-name").textContent = data.name;
        // document.getElementById("patient-dob").textContent = data.date_of_birth;
        document.getElementById("patient-gender").textContent = data.gender;
        document.getElementById("patient-contact").textContent = data.phone_number;
        document.getElementById("patient-emergency").textContent = data.emergency_contact;
        document.getElementById("patient-insurance").textContent = data.insurance_type;

    }

    function createLabResults(labResults){
        const tblContentBody = document.getElementById("lab-results-body");
        tblContentBody.innerHTML = "";

        labResults.forEach(data => {
            const row = document.createElement("tr");

            const resultCell = document.createElement("td");
            resultCell.textContent = data;  

           
            const downloadCell = document.createElement("td");
            downloadCell.id = `downloadIcon`
            const downloadIcon = document.createElement("img");
            downloadIcon.src = "img/download_FILL0_wght300_GRAD0_opsz24 (1).svg";  
            downloadIcon.alt = "downloadIcon";
            downloadIcon.width = 20;
            downloadIcon.height = 20;

            downloadCell.appendChild(downloadIcon);

            row.appendChild(resultCell);
            row.appendChild(downloadCell);

            tblContentBody.appendChild(row);
        });

    }

    function fetchContactData(){
        fetch(apiurl, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        }).then(function(response){
            if(response.ok){
                return response.json();
            }
            throw response;
        }).then(data => {
            data.forEach(contact => {
                createContactItem(contact);

                // Fetch the blood pressure data for a specific contact, e.g., Jessica
                if (contact.name === 'Jessica Taylor') {
                    createGraph(contact.diagnosis_history); 
                    createDiagnosticList(contact.diagnostic_list);
                    createLabResults(contact.lab_results);
                    setProfileInfo(contact);
                }
            });
        }).catch(err => console.error("Error fetching contact data: ", err));        
    }

    fetchContactData();
});
