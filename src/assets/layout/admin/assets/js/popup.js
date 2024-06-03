document.addEventListener('DOMContentLoaded', function () {
    var openPopupBtn = document.getElementById('openPopupBtn');
    var closePopupBtn = document.getElementById('closePopupBtn');
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('overlay');

    openPopupBtn.addEventListener('click', function () {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    });

    closePopupBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var openPopupUp = document.getElementById('openPopupUp');
    var closePopupUp = document.getElementById('closePopupUp');
    var popupUp = document.getElementById('popup-up');
    var overlay = document.getElementById('overlay');

    openPopupUp.onclick = function () {
        popupUp.style.display = 'block';
        overlay.style.display = 'block';
    };

    closePopupUp.onclick = function () {
        popupUp.style.display = 'none';
        overlay.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === popupUp) {
            popupUp.style.display = 'none';
            overlay.style.display = 'none';
        }
    };
});


