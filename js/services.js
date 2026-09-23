// 1. Data Payload
const serviceCatalog = {
    barber: {
        categoryTitle: "Barber Services",
        items: [
            { name: "Afro Haircut", price: "KSh 400" },
            { name: "Caucasian Haircut", price: "KSh 500" },
            { name: "Haircut + Dye", price: "KSh 700" },
            { name: "Haircut + Blowout", price: "KSh 700" },
            { name: "Kids Haircut", price: "KSh 200" },
            { name: "Face Scrub", price: "KSh 300" },
            { name: "Eyebrows", price: "KSh 200" },
            { name: "Hair Colour", price: "KSh 1500" },
            { name: "Haircut + Flat Iron", price: "KSh 1000" }
        ]
    },
    nails: {
        categoryTitle: "Nail Services",
        items: [
            { name: "Gel", price: "KSh 500 (Negotiable)" },
            { name: "Builder Gel", price: "KSh 1000" },
            { name: "Extensions", price: "KSh 1200 - 1500 (Negotiable)" },
            { name: "Tips & Gel", price: "KSh 1000 (+ Art)" },
            { name: "Gum Gel", price: "KSh 1500 - 2000 (Art incl.)" },
            { name: "Acrylic", price: "KSh 2000 - 3000 (Negotiable)" },
            { name: "Pedicure & Gel", price: "KSh 1000 - 1200 (Negotiable)" },
            { name: "Cutex", price: "KSh 150" },
            { name: "Pre Pedicure", price: "KSh 400" },
            { name: "Pre Manicure", price: "KSh 300" },
            { name: "Mani Removal", price: "KSh 250" },
            { name: "Pedi Removal", price: "KSh 300" }
        ]
    },
    dreadlocks: {
        categoryTitle: "Dreadlocks Services",
        items: [
            { name: "Locks Retouch", price: "KSh 700" },
            { name: "Locks Styling", price: "KSh 200" },
            { name: "Fresh Locks", price: "KSh 2500 (Start)" },
            { name: "Artificial Locks", price: "KSh 4500 (Start)" },
            { name: "Sisterlocks Retouch", price: "KSh 2000" },
            { name: "Fresh Sisterlocks", price: "KSh 10,000 (Depends)" },
            { name: "Extensions Locks", price: "KSh 1500" },
            { name: "Locks Dye", price: "KSh 700" },
            { name: "Locks Colours", price: "KSh 1000 (Depends)" },
            { name: "Sisterlock Dye", price: "KSh 700" },
            { name: "Sister Lock Colours", price: "KSh 1500 (Depends)" },
            { name: "Locks Treatment", price: "KSh 1200" }
        ]
    },
    caucasian: {
        categoryTitle: "Caucasian Hair",
        items: [
            { name: "Perm Rods", price: "KSh 1500" },
            { name: "Blowdry", price: "KSh 500" },
            { name: "Shingle", price: "KSh 1300" },
            { name: "Blowouts", price: "KSh 1000" },
            { name: "Color", price: "KSh 1000" },
            { name: "Highlights", price: "KSh 1500" },
            { name: "Highlights Foils", price: "KSh 2000" },
            { name: "Tonas", price: "KSh 1200" },
            { name: "Finger Coils", price: "KSh 1500" },
            { name: "Flat Iron", price: "KSh 700" },
            { name: "Low Lights", price: "KSh 2000" },
            { name: "Balayage / HL", price: "KSh 3500" },
            { name: "Weave / Wig (Full Bond)", price: "KSh 1300" },
            { name: "Weave / Wig Bob", price: "KSh 1000" },
            { name: "Texturizing Wig", price: "KSh 1000" },
            { name: "Stain Set", price: "KSh 1500" }
        ]
    }
};

// 2. Core App Logic
document.addEventListener('DOMContentLoaded', () => {
    const catalogContainer = document.getElementById('catalog-container');
    const modal = document.getElementById('booking-modal');
    const confirmBtn = document.getElementById('confirm-booking');
    const cancelBtn = document.getElementById('cancel-booking');
    const serviceTitle = document.getElementById('modal-service-title');
    const daySelect = document.getElementById('day-select');
    const timeSelect = document.getElementById('time-select');
    
    let activeService = '';
    let activePrice = '';

    // A. Render UI dynamically from the catalog
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
                    <p class="price-tag">🏷️ ${service.price}</p>
                </div>
                <button class="book-btn" data-service="${service.name}" data-price="${service.price}">Book Now</button>
            `;
            
            cardContainer.appendChild(card);
        });

        section.appendChild(cardContainer);
        catalogContainer.appendChild(section);
    }

    // B. Attach Modal Open Listeners
    const buttons = document.querySelectorAll('.book-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            activeService = e.target.getAttribute('data-service');
            activePrice = e.target.getAttribute('data-price');
            serviceTitle.innerText = `Book: ${activeService}`;
            modal.hidden = false;
        });
    });

    // C. Handle Modal Cancellation
    cancelBtn.addEventListener('click', () => {
        modal.hidden = true;
        activeService = ''; 
        activePrice = '';
    });

    // D. Handle Modal Confirmation & Routing
    confirmBtn.addEventListener('click', () => {
        const selectedDay = daySelect.value;
        const selectedTime = timeSelect.value;
        
        const url = generateWhatsAppLink(activeService, activePrice, selectedDay, selectedTime);
        
        modal.hidden = true;
        window.open(url, '_blank');
    });
});
