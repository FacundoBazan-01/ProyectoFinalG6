const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

// Toggle the sidebar on menu button click
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
