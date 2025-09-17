// backend/controllers/orderController.js
import pool from '../config/db.js';

// --- Create New Order ---
// @desc    Create new order
// @route   POST /api/orders
// @access  Private (User)
export const createOrder = async (req, res, next) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const userId = req.user.id; // Get user ID from protect middleware

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        return next(new Error('No order items provided'));
    }
    if (!shippingAddress) {
         res.status(400);
         return next(new Error('Shipping address is required'));
    }
     // Basic validation for prices (more thorough validation is recommended)
     if (itemsPrice == null || taxPrice == null || shippingPrice == null || totalPrice == null) {
         res.status(400);
         return next(new Error('Price details are missing'));
     }


    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction(); // Start transaction

        // Insert into orders table
        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?)',
            [userId, totalPrice, 'pending', JSON.stringify(shippingAddress)] // Store address as JSON string
        );
        const orderId = orderResult.insertId;

        // Prepare order items for insertion
        const orderItemValues = orderItems.map(item => [
            orderId,
            item.productId, // Ensure frontend sends productId
            item.quantity,
            item.price // Ensure frontend sends price per item
        ]);

        // Insert into order_items table
        // Note: Error handling for stock levels should ideally happen before this point
        await connection.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ?',
            [orderItemValues] // Bulk insert
        );

        // TODO: Implement stock reduction logic here if needed
        // for (const item of orderItems) {
        //   await connection.query('UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?', [item.quantity, item.productId, item.quantity]);
        //   // Check affected rows to ensure stock was sufficient
        // }


        await connection.commit(); // Commit transaction
        connection.release();

        // Fetch the created order details to return
        const [newOrder] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);

        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder[0]
        });

    } catch (error) {
        if (connection) {
            await connection.rollback(); // Rollback transaction on error
            connection.release();
        }
        console.error("Create Order Error:", error);
        // Check for specific errors like foreign key constraints or stock issues
        next(new Error('Failed to create order. Please try again.'));
    }
};

// --- Get Order By ID ---
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (User who owns order, or Admin)
export const getOrderById = async (req, res, next) => {
    const orderId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        // Fetch the order
        const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);

        if (orders.length === 0) {
            res.status(404);
            return next(new Error('Order not found'));
        }

        const order = orders[0];

        // Check if the user owns the order or is an admin
        if (order.user_id !== userId && userRole !== 'admin') {
            res.status(403); // Forbidden
            return next(new Error('Not authorized to view this order'));
        }

        // Fetch associated order items
        const [orderItems] = await pool.query(
           `SELECT oi.quantity, oi.price_at_purchase, p.id as productId, p.name, p.image_url
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?`,
            [orderId]
        );

        res.status(200).json({
            ...order,
            orderItems: orderItems,
             shippingAddress: JSON.parse(order.shipping_address || '{}') // Parse address string
        });

    } catch (error) {
        console.error("Get Order By ID Error:", error);
        next(new Error('Failed to fetch order details.'));
    }
};

// --- Get Logged In User's Orders ---
// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private (User)
export const getMyOrders = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const [orders] = await pool.query(
            'SELECT id, total_amount, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get My Orders Error:", error);
        next(new Error('Failed to fetch your orders.'));
    }
};


// --- Get All Orders (Admin) ---
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
export const getAllOrders = async (req, res, next) => {
    try {
        // Fetch orders and join with user info (optional)
        const [orders] = await pool.query(
           `SELECT o.id, o.total_amount, o.status, o.created_at, u.id as user_id, u.username, u.email
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC`
        );
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get All Orders Error:", error);
        next(new Error('Failed to fetch all orders.'));
    }
};

// --- Update Order Status (Admin) ---
// @desc    Update order status (e.g., to shipped, delivered)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
export const updateOrderStatus = async (req, res, next) => {
    const orderId = req.params.id;
    const { status } = req.body;

    // Validate status against ENUM values defined in the schema
    const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!status || !allowedStatuses.includes(status)) {
        res.status(400);
        return next(new Error(`Invalid status. Must be one of: ${allowedStatuses.join(', ')}`));
    }

    try {
         // Check if order exists
        const [orders] = await pool.query('SELECT id FROM orders WHERE id = ?', [orderId]);
        if (orders.length === 0) {
            res.status(404);
            return next(new Error('Order not found'));
        }


        const [result] = await pool.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, orderId]
        );

         if (result.affectedRows === 0) {
            // Should not happen if existence check passed, but handle anyway
            res.status(404);
            return next(new Error('Order not found or status unchanged.'));
        }

         const [updatedOrder] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);

        res.status(200).json({ message: 'Order status updated', order: updatedOrder[0] });

    } catch (error) {
        console.error("Update Order Status Error:", error);
        next(new Error('Failed to update order status.'));
    }
};

// TODO: Add payment result update route if needed (e.g., PUT /api/orders/:id/pay)