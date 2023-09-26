document.addEventListener('DOMContentLoaded', () => {
    const contacts = document.querySelectorAll('.contact');
    const searchInput = document.getElementById('searchInput');
    const contactPreview = document.getElementById('contactPreview');

    function quitarAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    searchInput.addEventListener('input', () => {
        const searchValue = quitarAcentos(searchInput.value.toLowerCase());
        let firstMatchingContact = null;

        contacts.forEach(contact => {
            const name = quitarAcentos(contact.querySelector('h2').textContent).toLowerCase();
            if (name.includes(searchValue)) {
                contact.style.display = 'block';
                if (!firstMatchingContact) {
                    firstMatchingContact = contact;
                }
            } else {
                contact.style.display = 'none';
            }
        });

        if (firstMatchingContact) {
            const name = firstMatchingContact.querySelector('h2').textContent;
            const extension = firstMatchingContact.querySelector('p:nth-child(2)').textContent;
            const email = firstMatchingContact.querySelector('p:nth-child(3)').textContent;

            const contactDetailsHTML = `
                <h2>${name}</h2>
                <p>${extension}</p>
                <p>${email}</p>
            `;
            contactPreview.innerHTML = contactDetailsHTML;
            contactPreview.style.display = 'block';
        } else {
            contactPreview.style.display = 'none';
        }
    });
});
