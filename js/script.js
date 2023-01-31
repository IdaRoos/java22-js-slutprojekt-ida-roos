let imageSize = '';
let img = '';
const imgDiv = document.querySelector('#imgDiv')
const errorText = document.createElement('h3');

// Add eventListener to form-button
document.querySelector('button').addEventListener('click', getUserInput);

// Get users inputvalues
function getUserInput(event) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    const imageAmount = document.querySelector('#amount').value;
    const sortImages = document.querySelector('#sort').value;
    imageSize = document.querySelector('#size').value;

    // checks if searchText is empty
    if (searchText === '') {
        imgDiv.innerHTML = '';
        errorText.innerText = 'You have to fill in image text before searching.';
        imgDiv.append(errorText);

    } else {
        getImageInfo(searchText, imageAmount, sortImages);
    }
}

// Add values to the url variable
function getImageInfo(text, amount, sort) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f65523c21e8cd824989286794aa6f382&text=${text}&sort=${sort}&per_page=${amount}&format=json&nojsoncallback=1`;

    // Fetch for API request
    fetch(url)
        // Checks if server status is successful
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw 'Error!';
            }
        })

        .then(showImages)
        // Catches all server statuses that is not successful
        .catch(error => {
            console.log(error)
            errorText.innerText = 'Error! Something went wrong.';
            imgDiv.append(errorText);
        });
}


function showImages(imgInfo) {
    // Clears imgDiv of content
    imgDiv.innerHTML = '';

    // Checks if there are any images
    if (imgInfo.photos.photo.length === 0) {
        errorText.innerText = 'No images were found.';
        imgDiv.append(errorText);

    } else {
        // Create img element for every image
        imgInfo.photos.photo.forEach(imgElements => {
            let server = imgElements.server;
            let id = imgElements.id;
            let secret = imgElements.secret;
            // Build the image url using the variables. Gets sizeInput from global
            const imgUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_${imageSize}.jpg`;

            img = document.createElement('img');
            img.src = imgUrl;
            imgDiv.append(img);

            // Open a new tab consisting the image url when the image is being clicked
            img.addEventListener('click', () => {
                window.open(imgUrl);
            });

        });

    }

}

