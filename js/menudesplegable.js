// JavaScript para mostrar/ocultar el submenu al hacer hover en el enlace "Comunidad"
const dropdown = document.querySelector('.dropdown');
const submenu = document.querySelector('.submenu');

dropdown.addEventListener('mouseover', () => {
  submenu.style.display = 'block';
  // Aplicar efecto de desenfoque a los elementos circundantes
  applyBlurToSiblings(dropdown);
});

dropdown.addEventListener('mouseout', () => {
  submenu.style.display = 'none';
  // Remover el efecto de desenfoque al salir del hover
  removeBlurFromSiblings(dropdown);
});

const dropdowns = document.querySelectorAll('.dropdowns');
const submenus = document.querySelectorAll('.submenus');

dropdowns.forEach((dropdown, index) => {
    const submenu = submenus[index];
    dropdown.addEventListener('mouseover', () => {
        submenu.style.display = 'block';
        // Aplicar efecto de desenfoque a los elementos circundantes
        applyBlurToSiblings(dropdown);
    });

    dropdown.addEventListener('mouseout', () => {
        submenu.style.display = 'none';
        // Remover el efecto de desenfoque al salir del hover
        removeBlurFromSiblings(dropdown);
    });

    dropdowns.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default behavior of the link (page navigation)
        submenus.style.display = submenus.style.display === 'block' ? 'none' : 'block';
    });
});

function applyBlurToSiblings(element) {
  const siblings = Array.from(element.parentElement.children).filter(el => el !== element);
  siblings.forEach(sibling => sibling.style.filter = 'blur(2px)');
}

function removeBlurFromSiblings(element) {
  const siblings = Array.from(element.parentElement.children).filter(el => el !== element);
  siblings.forEach(sibling => sibling.style.filter = 'none');
}

