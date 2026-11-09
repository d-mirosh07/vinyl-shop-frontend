showHeader();

fetch(API_URL + '/albums/')
    .then((response) => response.json())
    .then((albums) => {
        const list = document.getElementById('list');
        list.innerHTML = '';

        albums.forEach((album) => {
            const item = document.createElement('li');
            item.textContent = album.title + ' - ' + album.price + ' грн ';

            if (isLoggedIn()) {
                const button = document.createElement('button');
                button.textContent = 'У бажане';
                button.onclick = async () => {
                    const response = await authFetch('/wishlist/', {
                        method: 'POST',
                        body: JSON.stringify({album: album.id}),
                    });
                    button.textContent = response.ok ? 'Додано' : 'Помилка';
                };
                item.appendChild(button);
            }

            list.appendChild(item);
        });
    });