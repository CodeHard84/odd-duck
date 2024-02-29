'use strict';

//----- Global Variables -----//

let products = [];
const imageContainer = document.getElementById('pics');
let votingRounds = 25;

//----- Constructors ----- //

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

//----- Methods -----//

// Going to add a shuffle method to Array. This could be done by just
// creating a shuffle function, but I like this better.

Array.prototype.shuffle = function () {
  // Fisher-Yates shuffle.
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

//----- Functions -----//

function genProducts(number) {
  // Shuffle the products array
  products.shuffle();

  // Return the first number (x) products
  return products.slice(0, number);
}

function renderProducts(numberOfProducts) {
  const button = document.createElement('button');
  button.textContent = 'View Results';
  if (votingRounds > 0) {
    // Generate random products
    let randomProducts = genProducts(numberOfProducts);

    // Display the random products
    randomProducts.forEach(product => {
      const img = document.createElement('img');
      img.src = product.src;
      img.alt = product.name;

      // Increment the views
      product.views++;

      // Limit the size for consistency
      img.width = 300;
      img.height = 300;

      // Listen for clicks on any of the number of images.
      // Add a check here for the last round and remove the listener.
      img.addEventListener('click', function () {

        //debug
        console.log(`You clicked ${product.name}`);
        // console.log(products);

        // This seems hacky, better way to clear the pics section?
        imageContainer.innerHTML = '';
        renderProducts(numberOfProducts);

        // Increment the clicks
        product.clicks++;
      });

      // Create the html
      imageContainer.appendChild(img);
    });

    // Decrement rounds
    votingRounds--;
  } else {
    button.addEventListener('click', function () {
      button.remove(); // <--- ChatGPT helped with this line.
      renderTally();
    });
    imageContainer.appendChild(button);
  }
}

function renderTally() {
  // Let's put the results in the imageContainer.
  products.forEach(product => {
    imageContainer.innerHTML += '<p>' + product.name + ' was viewed '
      + product.views + ' and clicked ' + product.clicks + ' times.';
  });
}

//----- Load the array -----//

// Make an object holding all of the products.
// Going to make a function to avoid an RSI.

// ChatGPT helped with this... Using prompt:
// make a JS object that uses the jpg's filename as name and
// the filename as src with src being located ./img/ using this list
// and Now make a function to push that to the products array

// banana.jpg    boots.jpg      bubblegum.jpg  cthulhu.jpg
// dragon.jpg  pet-sweep.jpg  shark.jpg  tauntaun.jpg  water-can.jpg
// bag.jpg    bathroom.jpg  breakfast.jpg  chair.jpg
// dog-duck.jpg  pen.jpg     scissors.jpg   sweep.png
// unicorn.jpg   wine-glass.jpg

const fileNames = [
  'banana.jpg', 'boots.jpg', 'bubblegum.jpg', 'cthulhu.jpg', 'dragon.jpg',
  'pet-sweep.jpg', 'shark.jpg', 'tauntaun.jpg', 'water-can.jpg', 'bag.jpg',
  'bathroom.jpg', 'breakfast.jpg', 'chair.jpg', 'dog-duck.jpg', 'pen.jpg',
  'scissors.jpg', 'sweep.png', 'unicorn.jpg', 'wine-glass.jpg'
];

// I modified the array function GPT suggested and consolidated it to this.
fileNames.forEach(fileName => {
  const name = fileName.split('.')[0];
  const src = `./img/${fileName}`;
  const product = new Product(name, src); // <--- GPT helped with this line.
  products.push(product);
});

// End GPT.

//----- Kickoff -----//
renderProducts(3);

// Generate some products.


// Debug

console.log(products);
