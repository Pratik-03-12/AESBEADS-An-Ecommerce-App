import { defineQuery } from "next-sanity";

const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,"categories":categories[]->title
    }`,
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`,
);

const ORDERS_BY_USER_QUERY = defineQuery(
  `*[_type == "order" && userid == $userId] | order(orderDate desc){
    _id,
    orderNumber,
    status,
    orderDate,
    totalPrice,
    currency,
    amountDiscount,
    address,
    invoice,
    products[]{
      _key,
      quantity,
      product->{
        _id,
        name,
        price,
        slug,
        images
      }
    }
  }`,
);

export { DEAL_PRODUCTS, PRODUCT_BY_SLUG_QUERY, ORDERS_BY_USER_QUERY };