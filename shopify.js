import Shopify from "shopify-api-node";
import "dotenv/config";

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_URL,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
});

export default shopify;
