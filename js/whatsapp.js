/**
 * Utility function to generate a pre-filled WhatsApp link.
 * @param {string} serviceName - The name of the selected service.
 * @returns {string} The fully encoded wa.me URL.
 */
function generateWhatsAppLink(serviceName) {
    const phoneNumber = "254732289268";
    
    // Construct the multiline template string
    const message = `Hello 👋, I would like to book an appointment.\n\nI want to get a ${serviceName}\n\nPlease let me know when you are available. Thanks!`;
    
    // Encode the string so spaces and line breaks are URL-safe
    const encodedMessage = encodeURIComponent(message);
    
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
