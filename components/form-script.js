// Get service type from page URL
function getServiceType() {
    const path = window.location.pathname;
    if (path.includes('keratin') || path.includes('k-tip')) return 'keratin_bond_extensions';
    if (path.includes('hand-tied') || path.includes('hand-sewn') || path.includes('weft')) return 'hand_tied_extensions';
    if (path.includes('tape-in')) return 'tape_in_extensions';
    return 'general_inquiry';
}

function openContactModal() {
    document.getElementById('contactModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    const firstInput = document.getElementById('cf-name');
    if (firstInput) firstInput.focus();
}

function closeContactModal() {
    document.getElementById('contactModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function submitContact(e) {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const notes = document.getElementById('cf-notes').value.trim();

    const btn = document.querySelector('#contactForm button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Send directly to Netlify serverless function → Twilio → Jenn's phone
    fetch('https://roaring-kulfi-cd788b.netlify.app/.netlify/functions/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            notes: notes,
            service_type: getServiceType(),
            page: document.title
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-18371102793/v5YdCJ3LldwcEMmQg7hE',
                    'value': 1.0,
                    'currency': 'USD'
                });
            }
            btn.textContent = '✓ Message Sent to Jenn!';
            setTimeout(() => {
                window.location.href = '/inquiry.html';
            }, 1500);
        } else {
            throw new Error(data.error || 'Failed to send');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        btn.textContent = 'Error - Please text 206-295-4549';
        setTimeout(() => {
            btn.textContent = 'FREE CONSULTATION';
            btn.disabled = false;
        }, 3000);
    });
}

// Focus trap inside modal
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeContactModal();
});

// Initialize focus trap when modal opens
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    if (modal) trapFocus(modal);
});
