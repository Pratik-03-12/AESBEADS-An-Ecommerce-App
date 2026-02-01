import { defineQuery } from "next-sanity";

const DEAL_PRODUCTS = defineQuery(
    `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,"categories":categories[]->title
    }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
);

export {DEAL_PRODUCTS,PRODUCT_BY_SLUG_QUERY};