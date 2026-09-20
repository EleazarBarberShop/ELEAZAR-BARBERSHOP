const serviceCatalog = {
    hair: {
        categoryTitle: "Hair",
        items: [
            { name: "Gentleman's Cut", duration: "45 mins" },
            { name: "Line Up & Beard Trim", duration: "30 mins" },
            { name: "Ladies Fresh Cut", duration: "45 mins" },
            { name: "Colour ReTouch & Texturizing", duration: "1 hr" },
            { name: "Kids Fades Cut", duration: "60 mins" }
        ]
    },
    massage: {
        categoryTitle: "Massage",
        items: [
            { name: "Classic Massage", duration: "60 mins" },
            { name: "Scalp & Neck", duration: "15 mins" },
            { name: "Face Steaming & Scrubbing", duration: "40 mins" }
        ]
    },
    dreadlocks: {
        categoryTitle: "DreadLocks",
        items: [
            { name: "Retouch/Repair", duration: "50 mins" },
            { name: "Artificial Locs", duration: "1 hr 40 mins" },
            { name: "Human Hair Extensions", duration: "2 hrs" }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const catalogContainer = document.getElementById('catalog-container');
    const modal = document.getElementById('booking-modal');
    const confirmBtn = document.getElementById('confirm-booking');
    const cancelBtn = document.getElementById('cancel-booking');
    const serviceTitle = document.getElementById('modal-service-title');
    const daySelect = document.getElementById('day-select');
    const timeSelect = document.getElementById('time-select');
    
    let activeService = '';

    // 1. Render UI
    for (const key in serviceCatalog) {
        const category = serviceCatalog[key];
        
        const section = document.createElement('section');
        section.classList.add('category-section');
        section.innerHTML = `<h2 class="category-title">${category.categoryTitle}</h2>`;
        
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-grid');

        category.items.forEach(service => {
            const card = document.createElement('div');
            card.classList.add('service-card');
            
            card.innerHTML = `
                <div class="card-content">
                    <h3>${service.name}</h3>
                    <p class="duration">⏱ ${service.duration}</p>
                </div>
                <button class="book-btn" data-service="${service.name}">Book Now</button>
            `;
            
            cardContainer.appendChild(card);
        });

        section.appendChild(cardContainer);
        catalogContainer.appendChild(section);
    }
    
    const buttons = document.querySelectorAll('.book-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeService = e.target.getAttribute('data-service');
            // Update modal title and reveal it
            serviceTitle.innerText = `Book: ${activeService}`;
            modal.hidden = false;
        });
    });

    // Handle Modal Cancellation
    cancelBtn.addEventListener('click', () => {
        modal.hidden = true;
        activeService = ''; // Reset
    });

    // Handle Modal Confirmation
    confirmBtn.addEventListener('click', () => {
        const selectedDay = daySelect.value;
        const selectedTime = timeSelect.value;
        
        // Pass the extra parameters to the routing utility
        const url = generateWhatsAppLink(activeService, selectedDay, selectedTime);
        
        // Hide modal and route to WhatsApp
        modal.hidden = true;
        window.open(url, '_blank');
    });
});
});
