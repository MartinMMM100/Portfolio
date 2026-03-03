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

const grid = document.getElementById('projectsGrid');
let isDown = false, startX, startScrollLeft, hasDragged = false;
let velX = 0, lastX = 0, rafId = null;

function momentumScroll() {
    if (Math.abs(velX) < 0.5) return;
    grid.scrollLeft += velX;
    velX *= 0.92;
    rafId = requestAnimationFrame(momentumScroll);
}

grid.addEventListener('mousedown', e => {
    cancelAnimationFrame(rafId);
    isDown = true;
    hasDragged = false;
    startX = e.clientX;
    lastX = e.clientX;
    startScrollLeft = grid.scrollLeft;
    velX = 0;
    grid.style.cursor = 'grabbing';
    grid.style.userSelect = 'none';
    grid.classList.add('is-dragging');
    e.preventDefault();
});

document.addEventListener('mousemove', e => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) hasDragged = true;
    velX = lastX - e.clientX;
    lastX = e.clientX;
    grid.scrollLeft = startScrollLeft + (startX - e.clientX);
});

document.addEventListener('mouseup', e => {
    if (!isDown) return;
    isDown = false;
    grid.style.cursor = 'grab';
    grid.style.userSelect = '';
    grid.classList.remove('is-dragging');
    if (hasDragged) momentumScroll();
});

// Stop momentum on manual scroll / touch
grid.addEventListener('wheel', () => cancelAnimationFrame(rafId));

// Block link clicks after drag
grid.addEventListener('click', e => {
    if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        hasDragged = false;
    }
}, true);