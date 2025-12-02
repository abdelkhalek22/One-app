// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your Supabase project credentials
// Get these from: https://app.supabase.com/project/_/settings/api
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==================== CUSTOMERS ====================

/**
 * Save or update customer information
 * @param {string} phone - Customer phone number
 * @param {string} name - Customer name
 * @returns {Promise<Object>} - Result object
 */
export const saveCustomer = async (phone, name) => {
    try {
        const { data, error } = await supabase
            .from('customers')
            .upsert(
                { phone, name, updated_at: new Date().toISOString() },
                { onConflict: 'phone' }
            )
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error saving customer:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get customer by phone number
 * @param {string} phone - Customer phone number
 * @returns {Promise<Object|null>} - Customer data or null
 */
export const getCustomerByPhone = async (phone) => {
    try {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .eq('phone', phone)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
        return data;
    } catch (error) {
        console.error('Error getting customer:', error);
        return null;
    }
};

// ==================== ORDERS ====================

/**
 * Save a new order
 * @param {Object} orderData - Order information
 * @returns {Promise<Object>} - Result object with order ID
 */
export const saveOrder = async (orderData) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert({
                ...orderData,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return { success: true, data, orderId: data.id };
    } catch (error) {
        console.error('Error saving order:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get all orders (for admin dashboard)
 * @param {number} limit - Number of orders to fetch
 * @returns {Promise<Array>} - Array of orders
 */
export const getOrders = async (limit = 50) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error getting orders:', error);
        return [];
    }
};

/**
 * Get orders by customer phone
 * @param {string} phone - Customer phone number
 * @returns {Promise<Array>} - Array of orders
 */
export const getOrdersByPhone = async (phone) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_phone', phone)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error getting orders by phone:', error);
        return [];
    }
};

export default supabase;
