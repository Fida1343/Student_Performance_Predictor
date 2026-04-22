function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.addEventListener('click', function (event) {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.mobile-toggle');
    if (navLinks && toggle) {
        if (!navLinks.contains(event.target) && !toggle.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});