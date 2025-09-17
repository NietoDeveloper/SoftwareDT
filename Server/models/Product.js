// backend/models/Product.js
import pool from '../config/db.js';

export const Product = {
    // Find all products
    findAll: async () => {
        try {
            // Select only necessary fields for list view
            const [rows] = await pool.query('SELECT id, name, price, image_url, stock FROM products ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            console.error("Error finding all products:", error);
            throw new Error('Database error while fetching products.');
        }
    },

    // Find product by ID
    findById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
            return rows[0]; // Return product object or undefined
        } catch (error) {
            console.error("Error finding product by ID:", error);
            throw new Error('Database error while fetching product.');
        }
    },

    // Create a new product (Admin)
    create: async ({ name, description, price, stock, image_url }) => {
         try {
            const [result] = await pool.query(
                'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
                [name, description || null, price, stock || 0, image_url || null]
            );
             const insertId = result.insertId;
             return Product.findById(insertId); // Return the newly created product
        } catch (error) {
            console.error("Error creating product:", error);
            throw new Error('Database error while creating product.');
        }
    },

     // Update a product (Admin)
     update: async (id, fieldsToUpdate) => {
         if (Object.keys(fieldsToUpdate).length === 0) {
             throw new Error('No fields provided for update.');
         }
         try {
              const [result] = await pool.query('UPDATE products SET ? WHERE id = ?', [fieldsToUpdate, id]);
              if (result.affectedRows === 0) {
                   return null; // Indicate product not found or no changes made
              }
              return Product.findById(id); // Return the updated product
         } catch (error) {
             console.error("Error updating product:", error);
             throw new Error('Database error while updating product.');
         }
     },

     // Delete a product (Admin)
     delete: async (id) => {
         try {
             const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
             return result.affectedRows > 0; // Return true if deleted, false otherwise
         } catch (error) {
              console.error("Error deleting product:", error);
              // Handle potential foreign key constraints if orders reference this product
              if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                   throw new Error('Cannot delete product as it is referenced in existing orders.');
              }
              throw new Error('Database error while deleting product.');
         }
     }

    // Add other product-related database functions here
};