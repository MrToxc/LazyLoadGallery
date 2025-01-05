document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const imageCount = 30; // Number of images to display
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const caption = document.getElementById('caption');
    const closeModal = document.querySelector('.close');

    // Function to attempt loading an image with fallback
    const loadImageWithFallback = (img, baseId) => {
        let currentId = baseId;

        const tryLoadImage = () => {
            const imageUrl = `https://picsum.photos/id/${currentId}/300/200`;
            img.src = imageUrl;
            img.alt = `Image with ID ${currentId}`;
            img.setAttribute('data-full', `https://picsum.photos/id/${currentId}/1200/800`);

            img.onerror = () => {
                currentId++;
                tryLoadImage(); // Retry with the next ID
            };
        };

        tryLoadImage();
    };

    // Load images into the gallery
    for (let i = 0; i < imageCount; i++) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const img = document.createElement('img');
        img.classList.add('thumbnail');

        // Use fallback function to load image
        loadImageWithFallback(img, randomNumber);

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
