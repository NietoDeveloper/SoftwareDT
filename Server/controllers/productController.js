// backend/controllers/productController.js
import pool from '../config/db.js';

// --- Database Query Helper with Retry Logic ---
// Handles common transient connection errors like ECONNRESET, ETIMEDOUT, PROTOCOL_CONNECTION_LOST
const queryWithRetry = async (sql, params, retries = 1) => {
    while (retries >= 0) {
        try {
            // Attempt the database query using the connection pool
            const [results] = await pool.query(sql, params);
            return results; // Return results on success
        } catch (error) {
            // Check if the error is one we want to retry on and if retries are left
            if ((error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'PROTOCOL_CONNECTION_LOST') && retries > 0) {
                console.warn(`Database connection error (${error.code}), retrying query... (${retries} retries left)`);
                retries--;
                // Wait for a short period before retrying (simple exponential backoff could be added)
                await new Promise(resolve => setTimeout(resolve, 500 + (1-retries)*200)); // Wait slightly longer on retry
            } else {
                // If it's not a retryable error or retries are exhausted, log the final error
                 console.error("Database Query Error (Final):", { code: error.code, message: error.message, sql: sql.substring(0, 100) + '...' });
                // Re-throw the error to be handled by the calling controller function's catch block
                throw error;
            }
        }
    }
     // This line should theoretically not be reached if error throwing in the catch block works correctly
     throw new Error('Database query failed after multiple retries.');
};
// --- End Helper ---


// --- Get All Products ---
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res, next) => {
    try {
        console.log("Controller: Fetching all products...");
        // Select specific fields needed for the product list view
        const sql = 'SELECT id, name, price, image_url, stock FROM products ORDER BY created_at DESC';
        const products = await queryWithRetry(sql); // Use retry helper for this read operation
        console.log(`Controller: Successfully fetched ${products.length} products.`);
        // Send the products back as JSON
        res.status(200).json(products);
    } catch (error) {
        // If queryWithRetry fails after retries, pass a generic error to the global error handler
        next(new Error('Failed to fetch products. Please try again later.'));
    }
};

// --- Get Single Product by ID ---
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    const { id } = req.params;
    // Validate that the ID is a number
    if (isNaN(parseInt(id, 10))) {
        res.status(400);
        return next(new Error('Invalid product ID format.'));
    }
    try {
        console.log(`Controller: Fetching product with ID: ${id}`);
        const sql = 'SELECT * FROM products WHERE id = ?'; // Select all fields for detail view
        const products = await queryWithRetry(sql, [id]); // Use retry helper

        // Check if a product was found
        if (!products || products.length === 0) {
             console.log(`Controller: Product with ID: ${id} not found.`);
            res.status(404); // Not Found status
            return next(new Error('Product not found')); // Pass error to handler
        }
        // Product found, send it back
        console.log(`Controller: Successfully fetched product: ${products[0].name}`);
        res.status(200).json(products[0]);
    } catch (error) {
        next(new Error('Failed to fetch product details. Please try again later.'));
    }
};

// --- Search Products ---
// @desc    Search products by name or description
// @route   GET /api/products/search?q=keyword
// @access  Public
const searchProducts = async (req, res, next) => {
    const searchTerm = req.query.q; // Get search term 'q' from query string

    // Validate search term
    if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim().length < 1) {
        return res.status(400).json({ message: 'Please provide a valid search term (parameter "q").' });
    }

    const trimmedSearchTerm = searchTerm.trim();
    try {
        console.log(`Controller: Searching products with term: "${trimmedSearchTerm}"`);
        // Prepare search term with wildcards for LIKE query
        const searchQuery = `%${trimmedSearchTerm}%`;
        const sql = `
            SELECT id, name, price, image_url, stock
            FROM products
            WHERE name LIKE ? OR description LIKE ?
            ORDER BY name ASC
        `; // Search name and description, order by name
        const products = await queryWithRetry(sql, [searchQuery, searchQuery]); // Use retry helper

        console.log(`Controller: Found ${products.length} products matching "${trimmedSearchTerm}".`);
        res.status(200).json(products); // Return results (can be empty array)
    } catch (error) {
        next(new Error(`Failed to search products for "${trimmedSearchTerm}". Please try again later.`));
    }
};


// --- Create Product (Admin Only) ---
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin (Access control handled by middleware in routes)
const createProduct = async (req, res, next) => {
    const { name, description, price, stock, image_url } = req.body;

    // --- Server-Side Validation ---
    if (!name || price === undefined || price === null) { // Check price existence explicitly
        res.status(400);
        return next(new Error('Product name and price are required fields.'));
    }
     const parsedPrice = parseFloat(price);
     if (isNaN(parsedPrice) || parsedPrice <= 0) {
       res.status(400);
       return next(new Error('Price must be a valid positive number.'));
    }
    // Default stock to 0 if not provided or invalid, ensure it's non-negative
    const stockValue = (stock === undefined || stock === null || stock === '' || isNaN(parseInt(stock, 10)))
                        ? 0 : Math.max(0, parseInt(stock, 10));
    if (isNaN(stockValue) || stockValue < 0) { // Redundant check, but safe
         res.status(400);
         return next(new Error('Stock must be a non-negative integer.'));
    }
    // Basic URL validation (optional but good practice)
    if (image_url && !/^(https?:\/\/)/.test(image_url)) {
        res.status(400);
        return next(new Error('Image URL must be a valid HTTP/HTTPS URL.'));
    }
    // --- End Validation ---

    try {
         console.log("Controller: Creating new product:", { name, price: parsedPrice, stock: stockValue });
         const insertSql = 'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)';
         // Use pool.query directly for INSERT to avoid issues with retrying writes
         const [insertResult] = await pool.query(insertSql, [name, description || null, parsedPrice, stockValue, image_url || null]);
         const insertId = insertResult.insertId;

         if (!insertId) {
             throw new Error('Failed to insert product, no ID returned.');
         }

        // Fetch the newly created product to return it (use retry for this read)
        const selectSql = 'SELECT * FROM products WHERE id = ?';
        const newProduct = await queryWithRetry(selectSql, [insertId]);

        if (!newProduct || newProduct.length === 0) { throw new Error('Failed to retrieve newly created product after insert.'); }
        console.log(`Controller: Product created successfully with ID: ${insertId}`);
        res.status(201).json({ message: 'Product created successfully', product: newProduct[0] });
    } catch (error) {
        next(new Error('Failed to create product. Please check input or try again later.'));
    }
};

// --- Update Product (Admin Only) ---
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin (Access control handled by middleware in routes)
const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    // Validate ID and request body
    if (isNaN(parseInt(id, 10))) { return res.status(400).json({ message: 'Invalid product ID format.'}); }
    if (Object.keys(updates).length === 0) { return res.status(400).json({ message: 'No update fields provided.' }); }

    // --- Build Validated Fields ---
    const fieldsToUpdate = {};
    const allowedFields = ['name', 'description', 'price', 'stock', 'image_url'];
    let hasValidField = false;

    for (const key of allowedFields) {
        // Check if the key was actually sent in the request body
        if (updates.hasOwnProperty(key)) {
            hasValidField = true; // We have at least one potentially valid field
            const value = updates[key];

            // Add specific validation for each field
            if (key === 'price') {
                 const priceValue = parseFloat(value);
                 if (isNaN(priceValue) || priceValue <= 0) { return res.status(400).json({ message: 'Price must be a valid positive number.' }); }
                 fieldsToUpdate[key] = priceValue;
            } else if (key === 'stock') {
                 const stockValue = parseInt(value, 10);
                 // Allow stock to be 0, check if it's a non-negative integer
                 if (isNaN(stockValue) || stockValue < 0 || !Number.isInteger(stockValue)) {
                     return res.status(400).json({ message: 'Stock must be a non-negative integer.' });
                 }
                 fieldsToUpdate[key] = stockValue;
            } else if (key === 'image_url') {
                 if (value && !/^(https?:\/\/)/.test(value)) { // Validate only if not null/empty
                     return res.status(400).json({ message: 'Image URL must be a valid HTTP/HTTPS URL.' });
                 }
                 fieldsToUpdate[key] = value || null; // Allow setting image_url to null
            } else if (key === 'name') {
                 if (!value || typeof value !== 'string' || value.trim().length === 0) {
                     return res.status(400).json({ message: 'Product name cannot be empty.' });
                 }
                 fieldsToUpdate[key] = value;
            } else { // description
                 fieldsToUpdate[key] = value !== undefined ? value : null; // Allow null description
            }
        }
    }
     // Check if any valid field was actually identified for update
     if (!hasValidField || Object.keys(fieldsToUpdate).length === 0) {
         return res.status(400).json({ message: 'No valid or recognized fields provided for update.' });
     }
     // --- End Validation ---

    try {
         console.log(`Controller: Updating product ID: ${id} with data:`, fieldsToUpdate);
        // Check existence first (use retry)
        const checkSql = 'SELECT id FROM products WHERE id = ?';
        const existingProduct = await queryWithRetry(checkSql, [id]);
         if (existingProduct.length === 0) { res.status(404); return next(new Error('Product not found')); }

         // Perform update (use pool directly)
         const updateSql = 'UPDATE products SET ? WHERE id = ?';
         const [updateResult] = await pool.query(updateSql, [fieldsToUpdate, id]);

         // Check if rows were actually changed
         if (updateResult.affectedRows === 0 && updateResult.changedRows === 0) {
             console.log(`Controller: Product ${id} update - no changes needed or applied.`);
         } else if (updateResult.affectedRows === 0) {
              // This case means the WHERE clause (id=?) didn't match, shouldn't happen after existence check
              res.status(404); return next(new Error('Product not found during update attempt (unexpected).'));
         }

        // Fetch fully updated data to return (use retry)
        const selectSql = 'SELECT * FROM products WHERE id = ?';
        const updatedProduct = await queryWithRetry(selectSql, [id]);
         if (!updatedProduct || updatedProduct.length === 0) { throw new Error('Failed to retrieve product after update.'); }


        console.log(`Controller: Product ${id} updated successfully.`);
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct[0] });
    } catch (error) {
        next(new Error('Failed to update product. Please try again later.'));
    }
};

// --- Delete Product (Admin Only) ---
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin (Access control handled by middleware in routes)
const deleteProduct = async (req, res, next) => {
     const { id } = req.params;
      // Validate ID
      if (isNaN(parseInt(id, 10))) { return res.status(400).json({ message: 'Invalid product ID format.'}); }

     try {
         console.log(`Controller: Attempting to delete product ID: ${id}`);
         // Check existence first (use retry)
         const checkSql = 'SELECT id FROM products WHERE id = ?';
         const existingProduct = await queryWithRetry(checkSql, [id]);
         if (existingProduct.length === 0) { res.status(404); return next(new Error('Product not found')); }

         // Perform delete (use pool directly - no retry for DELETE)
         const deleteSql = 'DELETE FROM products WHERE id = ?';
         const [result] = await pool.query(deleteSql, [id]);

         // Check if a row was actually deleted
         if (result.affectedRows === 0) {
            // Should have been caught by existence check, but handle defensively
            res.status(404);
            return next(new Error('Product not found during delete attempt (unexpected).'));
         }

         console.log(`Controller: Product ${id} deleted successfully.`);
         // Send success message, no product data to return
         res.status(200).json({ message: 'Product deleted successfully' });

     } catch (error) {
         // Handle specific Foreign Key constraint error (product is in an order)
         if (error.code === 'ER_ROW_IS_REFERENCED_2') {
              console.warn(`Controller: Cannot delete product ${id} due to FK constraint.`);
              // Return a specific user-friendly error message
              res.status(400); // Bad Request might be more appropriate than 500 here
              return next(new Error('Cannot delete this product because it is part of existing orders. Consider marking it as inactive instead.'));
         }
         // Handle other database or unexpected errors
         next(new Error('Failed to delete product. Please try again later.'));
     }
 };


// --- Export block ---
// Ensure each function is defined above without the 'export' keyword
// and listed here exactly once.
export {
    getAllProducts,
    getProductById,
    searchProducts, // Include search
    createProduct,
    updateProduct,
    deleteProduct  // Include delete ONCE
};