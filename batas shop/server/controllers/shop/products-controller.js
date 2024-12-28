const Product = require("../../models/Product");


const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      // Check if the category is sales, and filter based on salePrice
      if (category.includes("sales")) {
        filters.salePrice = { $gt: 0 }; // Only products with salePrice > 0
      } else if (category.includes("best")) {
        // Only products with stock < 5
        filters.totalStock = { $lt: 5 };
      } else {
        filters.category = { $in: category.split(",") };
      }
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};


const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


module.exports = { getFilteredProducts, getProductDetails};