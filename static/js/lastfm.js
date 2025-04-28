
document.addEventListener('DOMContentLoaded', function () {
    fetch(`https://api.wson.me/api/lastfm/recent?limit=1&user=${lastfmUsername}`, {
        headers: {
            'X-API-KEY': `${lastfmApiKey}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const track = data.data.recenttracks.track[0];
            const largeImage = track.image.find(img => img.size === 'large')['#text'];

            // same for images
            function setImageSrcById(id, src) {
                var element = document.getElementById(id);
                if (element) {
                    element.src = src;
                }
            }
            
            if (largeImage !== "") {
                setImageSrcById('last-fm-art-side', largeImage);
            }
        })
        .catch(error => console.error('Error:', error))
        .finally(() => {
            function showLastFmOverlay() {
                lastfmOverlay.classList.remove("d-none");
            }

            const lastfmOverlay = document.getElementById("lastfm-overlay");
            showLastFmOverlay();

            const spinnerOverlaySide = document.getElementById('spinner-overlay-side');
            if (spinnerOverlaySide) {
                spinnerOverlaySide.style.display = 'none';
            }
        });
});