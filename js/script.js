document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYearElement = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to price categories on scroll
    const priceCategories = document.querySelectorAll('.price-category');
    if (priceCategories.length > 0) {
        priceCategories.forEach((category, index) => {
            category.setAttribute('data-aos', 'fade-up');
            category.setAttribute('data-aos-delay', `${index * 100}`);
        });
    }

    // Validate phone number input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+\s-]/g, '');
        });
    }
});

async function sendWhatsAppMessage(message) {
    const url = `https://graph.facebook.com/v17.0/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messaging_product: "whatsapp",
            to: WHATSAPP_CONFIG.RECIPIENT_NUMBER,
            type: "text",
            text: {
                body: message
            }
        })
    });

    return response;
} 