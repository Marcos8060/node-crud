const express = require('express');
const { Client } = require('pg'); // Import the PostgreSQL client
const Product = require('./models/product.model.js')
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Node API Server Listened');
});


app.post('/api/products', async(req,res) => {
    try {
        await Product.create(req.body);
        res.status(200).json({ message: 'Product created successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// get all products
app.get('/api/products', async(req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// get single product
app.get('/api/product/:id',async(req,res) => {
    const { id } = req.params
    try {
        const singleProduct = await Product.findByPk(id);

        if(!singleProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(singleProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// update a product
app.put('/api/product/:id',async(req,res) => {
    const { id } = req.params
    try {
        const updateProduct = await Product.update(req.body, {
            where: { id: id },
        })
        if(!updateProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// delete a product
app.delete('/api/product/:id', async(req,res) => {
    const {id } = req.params
    try {
        const deletedProduct = await Product.destroy({
            where: { id: id },
        })
        if(!deletedProduct){
            res.status(404).json({ message: 'Product not found'})
        }
        res.status(200).json({ message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


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
