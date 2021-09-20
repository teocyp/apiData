let userInfo = document.querySelector('.content');
const modalBG = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.bg-close');

const fetchData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        return data;
    }
    catch (err) {
        console.log('Data can not be fetched', err);
    }
}

fetchData()
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const html = `
            <tr>
                <td>${data[i].name}</td>
                <td>${data[i].username}</td>
                <td>${data[i].website}</td>
                <td>${data[i].email}</td>
                <td class="delete" id="delete">Delete</td>
                <td class="view-details" id=${i}>View Details</td>
            </tr>
        `
            userInfo.innerHTML += html;

        }

        const modalInfo = document.querySelector('.modal');
        // Modal turn on
        userInfo.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details')) {
                modalBG.classList.add('bg-active');
                const modalID = +e.target.id;

                // modal street information
                const street = document.createElement('h1');
                street.textContent = 'Street Address';
                modalInfo.appendChild(street);
                const modalStreet = document.createElement('h3');
                modalStreet.textContent = data[modalID].address.street;
                modalInfo.appendChild(modalStreet);

                // modal city information
                const city = document.createElement('h1');
                city.textContent = 'City';
                modalInfo.appendChild(city);
                const modalCity = document.createElement('h3');
                modalCity.textContent = data[modalID].address.city;
                modalInfo.appendChild(modalCity);

                //modal zipcode information
                const zipcode = document.createElement('h1');
                zipcode.textContent = 'Zipcode';
                modalInfo.appendChild(zipcode);
                const modalZipcode = document.createElement('h3');
                modalZipcode.textContent = data[modalID].address.zipcode;
                modalInfo.appendChild(modalZipcode);

                modalClose.addEventListener('click', (e) => {
                    if (e.target.classList.contains('bg-close')) {
                        modalBG.classList.remove('bg-active');
                    }
                    city.remove();
                    street.remove();
                    zipcode.remove();
                    modalCity.remove();
                    modalStreet.remove();
                    modalZipcode.remove();
                })
            }


            // Create User

        })

        const form = document.querySelector('.userform');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.name.value.trim();
            const username = form.username.value.trim();
            const website = form.website.value.trim();
            const email = form.email.value.trim();

            const modalHtml = `<tr>
            <td>${name}</td>
            <td>${username}</td>
            <td>${website}</td>
            <td>${email}</td>
            <td class="delete" id="delete">Delete</td>
            <td class="view-details">View Details</td>
        </tr>`;

            userInfo.innerHTML += modalHtml;
            form.reset();
        })

    });


// User Delete
userInfo.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
})

