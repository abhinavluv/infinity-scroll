const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// UnSplash API
const count = 30;
const apiKey = "KiJnUtQMHmGfCXG2afYL-1MrP4Lj3LeWMKxy3ql9o1o";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
let imageLoaded = () => {
  imagesLoaded += 1;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// Helper function to set attributes for DOM Elements
let setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Display Photos
let displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photos) => {
    //   Creating  <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photos.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photos.links.html,
      target: "_blank",
    });

    // Create image for photos
    const img = document.createElement("img");
    // img.setAttribute("src", photos.urls.regular);
    // img.setAttribute("alt", photos.alt_description);
    // img.setAttribute("title", photos.alt_description);
    setAttributes(img, {
      src: photos.urls.regular,
      alt: photos.alt_description,
      title: photos.alt_description,
    });

    // Event Listener, check when loading is done
    img.addEventListener("load", imageLoaded);

    // Put image inside <a> and put them both inside image-container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Fetch photos from Unspash API
let getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    // console.log("Photos Array: ", photosArray);
    displayPhotos();
  } catch (error) {}
};

// Check if scrolling near the end of page, then load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("Load more...");
  }
});

getPhotos();
