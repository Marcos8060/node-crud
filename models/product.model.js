const { Sequelize, DataTypes } = require("sequelize");

// Set up Sequelize instance
const sequelize = new Sequelize(
  "node_js",
  "postgres",
  "getaways",
  {
    host: "localhost", // Your PostgreSQL host
    dialect: "postgres", // Specify PostgreSQL dialect
  }
);

// Define the Product model (similar to Mongoose schema)
const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Equivalent to required: true
      validate: {
        notEmpty: {
          msg: "Please Enter product name",
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Sync the schema with the database
sequelize
  .sync()
  .then(() => {
    console.log("Product table created");
  })
  .catch((err) => {
    console.error("Unable to create table:", err);
  });

module.exports = Product;
