import { ObjectId } from 'mongoose';

export class Product {
  _id!: number;
  name!: string;
  price!: string;
  quantity!: number;
  description!: string;
  category?: { categoryId: ObjectId; categoryName: string };
  id?: number;
  image!: string;
}
