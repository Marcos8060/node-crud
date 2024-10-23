const express = require('express');
const { Client } = require('pg'); // Import the PostgreSQL client
const ProductRoute = require('./routes/product.route')
const app = express();

// midddleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// routes
app.use('/api/products', ProductRoute)



// Configure PostgreSQL connection
const client = new Client({
  user: 'postgres',
  host: 'localhost', // Your database host
  database: 'node_js',
  password: 'getaways',
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
    // Start the Express server after successful database connection
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Connection Failed', err);
  });
