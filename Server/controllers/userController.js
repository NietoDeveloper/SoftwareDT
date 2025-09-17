// backend/controllers/userController.js
import pool from '../config/db.js';

// --- Get All Users (Admin) ---
// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res, next) => {
    try {
        // Select users but exclude password
        const [users] = await pool.query('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC');
        res.status(200).json(users);
    } catch (error) {
        console.error("Get All Users Error:", error);
        next(new Error('Failed to fetch users.'));
    }
};

// --- Get User By ID (Admin) ---
// @desc    Get single user by ID
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const [users] = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            res.status(404);
            return next(new Error('User not found'));
        }
        res.status(200).json(users[0]);
    } catch (error) {
        console.error("Get User By ID Error:", error);
        next(new Error('Failed to fetch user details.'));
    }
};

// --- Delete User (Admin) ---
// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    // Optional: Prevent admin from deleting themselves?
    if (req.user.id === parseInt(userId, 10)) {
         res.status(400);
         return next(new Error('Admin users cannot delete themselves.'));
    }

    try {
        // Check if user exists first
        const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            res.status(404);
            return next(new Error('User not found'));
        }

        // Delete the user (orders might cascade delete based on FOREIGN KEY constraint)
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows === 0) {
            res.status(404); // Should not happen if existence check passed
            return next(new Error('User not found.'));
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Delete User Error:", error);
         // Handle potential foreign key issues if ON DELETE SET NULL/RESTRICT is used elsewhere
        next(new Error('Failed to delete user.'));
    }
};


// --- Update User Role (Admin) ---
// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin)
export const updateUserRole = async (req, res, next) => {
    const userId = req.params.id;
    const { role } = req.body;

    // Validate role
    const allowedRoles = ['user', 'admin'];
    if (!role || !allowedRoles.includes(role)) {
        res.status(400);
         return next(new Error(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`));
    }

     // Optional: Prevent admin from changing their own role via this route?
    if (req.user.id === parseInt(userId, 10)) {
         res.status(400);
         return next(new Error('Admin users cannot change their own role via this route.'));
    }

    try {
         // Check if user exists
        const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (users.length === 0) {
            res.status(404);
            return next(new Error('User not found'));
        }

        const [result] = await pool.query(
            'UPDATE users SET role = ? WHERE id = ?',
            [role, userId]
        );

         if (result.affectedRows === 0) {
            res.status(404); // Should not happen
            return next(new Error('User not found or role unchanged.'));
        }

        const [updatedUser] = await pool.query('SELECT id, username, email, role FROM users WHERE id = ?', [userId]);

        res.status(200).json({ message: 'User role updated successfully', user: updatedUser[0] });

    } catch (error) {
        console.error("Update User Role Error:", error);
        next(new Error('Failed to update user role.'));
    }
};