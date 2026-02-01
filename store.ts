import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { Product } from './sanity.types';

export interface CartItem{
    product: Product;
    quantity: number;
}