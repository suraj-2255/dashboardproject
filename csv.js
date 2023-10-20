const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Your JSON data
const jsonData = [
  { name: 'John', age: 25, city: 'New York' },
  { name: 'Alice', age: 30, city: 'London' },
  // Add more data as needed
];

// Specify the CSV file path
const outputFile = 'output.csv';

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: outputFile,
  header: Object.keys(jsonData[0]), // Use the keys from the first object as headers
});

// Write the JSON data to the CSV file
csvWriter.writeRecords(jsonData)
  .then(() => console.log('Conversion complete.'))
  .catch((error) => console.error('Error writing to CSV:', error));
