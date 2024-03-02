'use strict';

//----- Global Variables -----//

let products = [];
let lastViewed = [];
const imageContainer = document.getElementById('pics');
let votingRounds = 5;
let howManyProducts = 3;
let firstRun = true;

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
  // How this all fits together:
  // I remove the first n products from the top of the array.
  // Once they are rendered, they are added back to the bottom of
  // the array. This means they will never show back to back.

  if (firstRun) {
    products.shuffle();
    firstRun = false;
  }

  // Return the first number (x) products
  return products.splice(0, number);
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

      const onClick = function () {
        //debug
        console.log(`You clicked ${product.name}`);
        // console.log(products);

        // This seems hacky, better way to clear the pics section?
        if (votingRounds > 0) {
          imageContainer.innerHTML = '';
        }
        renderProducts(numberOfProducts);

        // Increment the clicks
        product.clicks++;
      };

      // Listen for clicks on any of the number of images.
      img.addEventListener('click', onClick);

      // Append the products to the bottom of the array
      products.push(product);

      // Create the html
      imageContainer.appendChild(img);
    });

    // Decrement rounds
    votingRounds--;
  } else {
    // Need to remove the click listener...
    // the images variable will contain all the images with an eventlistener
    // just need to find out how to remove the listener.
    const images = document.querySelectorAll('#pics img');

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
  renderChart();
}

function renderChart() {
  // Use chart.js to render the stored data.
  const productsCombined = [];
  products.forEach(product => {
    productsCombined.push({
      Name: product.name,
      Views: product.views,
      Clicks: product.clicks
    });
  });

  // productsCombined should have all the data required to build the chart.
  console.log(productsCombined);

  const labels = [];
  const viewsData = [];
  const clicksData = [];

  // There has to be a better way for this... I read into 'map' but
  // I don't quite understand how to use it yet.
  for (let i = 0; i < productsCombined.length; i++) {
    labels.push(productsCombined[i].Name);
    viewsData.push(productsCombined[i].Views);
    clicksData.push(productsCombined[i].Clicks);
  }

  // Render chart using Chart.js
  const canvasChart = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(canvasChart, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Views',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: viewsData
        },
        {
          label: 'Clicks',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: clicksData
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
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
renderProducts(howManyProducts);

// Generate some products.


// Debug

console.log(products);
