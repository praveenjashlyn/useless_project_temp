const sheetId = "1U9bw_LGu3LJb6vTjg6V0abylsRm5CSfy5Sw_Hk5sfyM";
const apiKey = "AIzaSyDWpj0UVONmXcoQ55TeswgvWl_uRjrInNM";
const range = "Sheet1"; // Change to your sheet name

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

function loadEvents() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const eventsContainer = document.getElementById("events");
            eventsContainer.innerHTML = ""; // Clear old events

            // Skip first row if it’s headers
            data.values.slice(1).forEach(row => {
                const [date,title,description, category] = row;

                const eventHTML = `
                    <div class="event">
                        <div class="event-date">
                            <span>${date}</span> 
                        </div>
                        <div class="event-details">
                            <h2>${title}</h2>
                            <p>${description}</p>

                            <div class="category ${category.toLowerCase()}">${category}</div>
                            
                        </div>
                    </div>
                `;

                eventsContainer.innerHTML += eventHTML;
            });
        });
}

loadEvents();
setInterval(loadEvents, 10000); // Refresh every 10 sec
