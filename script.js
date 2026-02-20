function showSection(id, btn) {
    document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');      

    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Hide project placeholder if real image loads
document.querySelectorAll('.project-preview img').forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
        img.parentElement.classList.add('has-img');
    } else {
        img.addEventListener('load', () => img.parentElement.classList.add('has-img'));
    }
});