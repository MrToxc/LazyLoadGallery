document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const imageCount = 30; // Number of images to display
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const caption = document.getElementById('caption');
    const closeModal = document.querySelector('.close');
    let randomNumber = 1;

    // Load images into the gallery
    for (let i = 0; i < imageCount; i++) {
        randomNumber = Math.floor(Math.random() * 1000) + 1;
        const img = document.createElement('img');
        img.src = `https://picsum.photos/id/${randomNumber}/300/200`;
        img.alt = `Image ${i + 1}`;
        img.setAttribute('data-full', `https://picsum.photos/id/${randomNumber}/1200/800`); // Full-resolution URL
        img.classList.add('thumbnail');

        // Add click event to open modal
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.getAttribute('data-full');
            caption.textContent = img.alt;
        });

        gallery.appendChild(img);
    }

    // Close the modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the image
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
