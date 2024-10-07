const Product = require('../Models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Could not get products' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

exports.createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

exports.deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    const result = await Product.findByIdAndDelete(id)
    res.send(result)
  } 
  catch (error) {
    res.status(500).json({ message: error.message})
  }
}


// Add more controller functions as needed (e.g., createProduct, updateProduct, deleteProduct)
