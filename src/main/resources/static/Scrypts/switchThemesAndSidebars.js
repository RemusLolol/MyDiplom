let currentTheme = 'light-theme';
let themeElement = document.body;
function toggleTheme() {
    currentTheme = (currentTheme === 'dark-theme') ? 'light-theme' : 'dark-theme';
    themeElement.className = currentTheme;
    let moonIcon = document.querySelector('.fa-moon');
    let sunIcon = document.querySelector('.fa-sun');
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
}

function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    let burger = document.querySelector('.burger');
    sidebar.classList.toggle('open');
    burger.classList.toggle('open');
}