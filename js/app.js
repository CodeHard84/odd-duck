'use strict';

//----- Global Variables -----//

let products = [];

//----- Constructors ----- //

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
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

// Add a method to Product to generate a number of random products from
// products array.

// Product.prototype.genProducts = function(number) {
// };

// I am going to make the above a function for now because I am not sure if
// putting the method in the constructor is appropriate here...

//----- Functions -----//

function genProducts(number) {
  // Grab a number of random products from the productsTmp array.
  while(number > 0) {
    number--;
  }
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

const imgObject = {};

fileNames.forEach(fileName => {
  const name = fileName.split('.')[0];
  const src = `./img/${fileName}`;
  imgObject[name] = src;
});

// TODO: I need to make this create an instance of a product using the
// constructor.

function populateProductsArray(fileNames, products) {
  fileNames.forEach(fileName => {
    const name = fileName.split('.')[0];
    const src = `./img/${fileName}`;
    products.push({ name, src });
  });
}

// End GPT.

//----- Kickoff -----//

// Populate the array
populateProductsArray(fileNames, products);
const productsTmp = products;

// Shuffle the array using our new method shuffle.
products = products.shuffle();
console.log(products);

// Generate some products.
genProducts(3);

