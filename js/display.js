// Get references to HTML elements
const stockSymbolInput = document.getElementById("stockSymbolInput");
const trackButton = document.getElementById("trackButton");
const stockNameDisplay = document.getElementById("stockNameDisplay");
const stockSymbolDisplay = document.getElementById("stockSymbolDisplay");
const stockPriceDisplay = document.getElementById("stockPriceDisplay");
const stockChangeDisplay = document.getElementById("stockChangeDisplay");

// Event listener for the track button
trackButton.addEventListener("click", () => {
    const symbol = stockSymbolInput.value.toUpperCase();
    fetchStockData(symbol);
});

// Function to fetch stock data from an API
function fetchStockData(symbol) {
    const apiKey = '8F4GS42TWIN23N23'; // Replace with your API key
    const functionName = 'TIME_SERIES_DAILY';
    const outputSize = 'compact'; // You can change this to 'full' if needed
    const dataType = 'json'; // You can change this to 'csv' if needed

    const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&outputsize=${outputSize}&apikey=${apiKey}&datatype=${dataType}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayStockData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            stockNameDisplay.textContent = "Error fetching data.";
        });
}
// Function to display stock data
function displayStockData(data) {
    const metaData = data['Meta Data'];
    const timeSeries = data['Time Series (Daily)'];

    if (!metaData || !timeSeries) {
        stockNameDisplay.textContent = "Stock data not found.";
        return;
    }

    const symbol = metaData['2. Symbol'];
    const lastRefreshed = metaData['3. Last Refreshed'];
    const dailyData = timeSeries[lastRefreshed];
    
    const stockName = metaData['1. Information'];
    const stockPrice = dailyData['4. close'];

    stockNameDisplay.textContent = stockName;
    stockSymbolDisplay.textContent = `Symbol: ${symbol}`;
    stockPriceDisplay.textContent = `Price: $${stockPrice}`;
    
    // Clear the "Change" display as it's not available
    stockChangeDisplay.textContent = "";
}
// Function to display stock data
// function displayStockData(data) {
//     const metaData = data['Meta Data'];
//     const timeSeries = data['Time Series (Daily)'];

//     if (!metaData || !timeSeries) {
//         stockNameDisplay.textContent = "Stock data not found.";
//         return;
//     }

//     const symbol = metaData['2. Symbol'];
//     const lastRefreshed = metaData['3. Last Refreshed'];
//     const dailyData = timeSeries[lastRefreshed];
    
//     const stockName = metaData['1. Information'];
//     const stockPrice = dailyData['4. close'];
//     const stockChange = dailyData['9. change'];
//     const stockPercentChange = dailyData['10. change percent'];

//     stockNameDisplay.textContent = stockName;
//     stockSymbolDisplay.textContent = `Symbol: ${symbol}`;
//     stockPriceDisplay.textContent = `Price: $${stockPrice}`;
//     stockChangeDisplay.textContent = `Change: $${stockChange} (${stockPercentChange}%)`;
// }