import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config/config.js';
import { connectDB } from '../config/db.js';
import { errorHandler } from '../middlewares/errorHandler.js';

// Routes (reuse existing route files at repo root)
import customersRoutes from '../routes/customers.routes.js';
import addressRoutes from '../routes/address.routes.js';
import districtsRoutes from '../routes/districts.routes.js';
import staffRoutes from '../routes/staff.routes.js';
import ordersRoutes from '../routes/orders.routes.js';
import orderItemsRoutes from '../routes/orderitems.routes.js';
import paymentsRoutes from '../routes/payments.routes.js';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

connectDB();

app.get('/', (req, res) => res.json({ message: 'Water Logistics API', version: '1.0.0' }));

app.use('/api/customers', customersRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/districts', districtsRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order-items', orderItemsRoutes);
app.use('/api/payments', paymentsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

// error handler
app.use(errorHandler);

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} on port ${PORT}`);
});
