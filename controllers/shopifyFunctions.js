import shopify from "../shopify.js";

const getOrders = async (req, res) => {
  const { limit } = req.query;
  const orders = await shopify.order.list({
    limit: limit || 2,
  });

  const filteredOrders = orders.filter(
    (order) => order.tags.includes("Packed") === false
  );

  for (let productOrders of filteredOrders) {
    productOrders.newProducts = [];
    for (const product of productOrders.line_items) {
      productOrders.newProducts.push(
        await shopify.product.get(product.product_id)
      );
    }
  }

  res.json(filteredOrders);
};

const getPackedOrders = async (req, res) => {
  const { limit } = req.query;
  const orders = await shopify.order.list({
    limit: limit || 2,
  });

  const filteredOrders = orders.filter(
    (order) => order.tags.includes("Packed") === true
  );
  res.json(filteredOrders);
};

const createPacked = async (req, res) => {
  const { orderId, user } = req.query;

  const updatedOrder = await shopify.order
    .update(orderId, {
      tags: ["Packed", user],
    })
    .then((order) => order)
    .catch((err) => err);

  res.json(updatedOrder);
};

export { getOrders, createPacked, getPackedOrders };
