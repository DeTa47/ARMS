const UserDetails = require('../schema/UserDetails');
const mongoose = require('mongoose');

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserDetails.find({}); // Fetch all user data
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Delete a user and their associated data
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Delete user details
        await UserDetails.findByIdAndDelete(userId, { session });

        // Add logic to delete associated data from other collections
        // Example: Assuming there are collections like Orders, Activities, etc.
        await mongoose.connection.collection('orders').deleteMany({ userId }, { session });
        await mongoose.connection.collection('activities').deleteMany({ userId }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'User and associated data deleted successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Error deleting user and associated data', error });
    }
};