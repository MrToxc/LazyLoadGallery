document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const imageCount = 24;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const caption = document.getElementById('caption');
    const closeModal = document.querySelector('.close');

    /* Tohle musim delat, 
    prtoze ta databaze z nejakeho mne zahadneho duvodu obcas vynechava
    id, takze tam byla prazdna mista, jeto vyreseno zpusobem, ze kdyz se to stane, id se zvysuje o 1 
    dokud id neni valid formou rekurze */
    const loadImageWithFallback = (img, baseId) => {
        let currentId = baseId;

        const tryLoadImage = () => {
            const imageUrl = `https://picsum.photos/id/${currentId}/300/200`;
            img.src = imageUrl;
            img.alt = `Image with ID ${currentId}`;
            img.setAttribute('data-full', `https://picsum.photos/id/${currentId}/1200/800`);

            img.onerror = () => {
                currentId++;
                tryLoadImage();
            };
        };
        tryLoadImage();
    };

    // foreach do galerie, duh
    for (let i = 0; i < imageCount; i++) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const img = document.createElement('img');
        img.classList.add('thumbnail');

        // fallback metoda kvuli dementim ideckam
        loadImageWithFallback(img, randomNumber);

        // CHATGPT
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.getAttribute('data-full');
            caption.textContent = img.alt;
        });

        gallery.appendChild(img);
    }

    // Close the modal when clicking the close button CHATGPT
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the image CHATGPT
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
