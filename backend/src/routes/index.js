import express from 'express';
import userRoutes from './user.Routes.js';
import contactRoutes from './contact.Routes.js';
import productRoutes from './product.Routes.js';
import imageKitRoutes from './imageKit.Routes.js';
import categoryRoutes from './category.Routes.js';
import adminRoutes from './admin.Routes.js';
import franchiseRoutes from './franchise.Routes.js';

const routers = express.Router();

routers.use('/users', userRoutes);
routers.use('/contact', contactRoutes);
routers.use('/products', productRoutes);
routers.use('/imagekit', imageKitRoutes);
routers.use('/categories', categoryRoutes);
routers.use('/admin', adminRoutes);
routers.use('/franchise', franchiseRoutes);

export default routers;

