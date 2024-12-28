const { initializePayment } = require("../../helpers/paymentService");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    const paymentData = {
      locale: "tr", // Locale: "tr" for Turkish, "en" for English
      conversationId: "123456789",
      price: totalAmount.toFixed(2), // Raw price of items
      paidPrice: totalAmount.toFixed(2), // Final price (with fees, etc.)
      currency: "TRY", // Replace with your currency
      installment: 1, // Single installment
      basketId: "B67832",
      paymentChannel: "WEB",
      paymentGroup: "PRODUCT",
      paymentCard: {
        cardHolderName: req.body.cardHolderName,
        cardNumber: req.body.cardNumber,
        expireMonth: req.body.expireMonth,
        expireYear: req.body.expireYear,
        cvc: req.body.cvc,
        registerCard: 0,
      },
      buyer: {
        id: userId,
        name: addressInfo.fullName,
        surname: addressInfo.lastName || "Unknown",
        gsmNumber: addressInfo.phoneNumber,
        email: addressInfo.email,
        identityNumber: "12345678901", // Use a valid identity number for Turkish users
        registrationAddress: addressInfo.address,
        ip: req.ip,
        city: addressInfo.city,
        country: addressInfo.country || "Turkey",
        zipCode: addressInfo.zipCode,
      },
      shippingAddress: {
        contactName: addressInfo.fullName,
        city: addressInfo.city,
        country: addressInfo.country || "Turkey",
        address: addressInfo.address,
        zipCode: addressInfo.zipCode,
      },
      billingAddress: {
        contactName: addressInfo.fullName,
        city: addressInfo.city,
        country: addressInfo.country || "Turkey",
        address: addressInfo.address,
        zipCode: addressInfo.zipCode,
      },
      basketItems: cartItems.map((item) => ({
        id: item.productId,
        name: item.title,
        category1: item.category || "General",
        itemType: "PHYSICAL",
        price: item.price.toFixed(2),
      })),
    };

    const paymentResponse = await initializePayment(paymentData);

    if (paymentResponse.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment initialization failed",
        error: paymentResponse.errorMessage,
      });
    }

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod: "iyzico",
      paymentStatus: "pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: paymentResponse.paymentId,
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newlyCreatedOrder._id,
      paymentResponse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while creating the order",
    });
  }
};


const capturePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product || product.totalStock < item.quantity) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for product: ${item.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed and payment captured",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while capturing the payment",
    });
  }
};


const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};