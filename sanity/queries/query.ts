import { defineQuery } from "next-sanity";

const DEAL_PRODUCTS = defineQuery(
    `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,"categories":categories[]->title
    }`
);

export {DEAL_PRODUCTS};