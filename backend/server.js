import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import uploadRouter from './routers/uploadRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ShopBridge', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/uploads', uploadRouter);

app.get("/", (req, res) => {
    res.send("Server is working.");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});