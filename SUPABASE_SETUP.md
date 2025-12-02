# Supabase Database Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: One Store App
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your location
5. Click "Create new project" (takes ~2 minutes)

## Step 2: Create Database Tables

Once your project is ready, go to the **SQL Editor** and run this SQL:

```sql
-- Create customers table
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_phone VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  order_type VARCHAR(50) NOT NULL, -- 'book', 'print', 'advanced_print'
  order_details JSONB NOT NULL,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
CREATE POLICY "Enable all operations for customers" ON customers
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for orders" ON orders
  FOR ALL USING (true) WITH CHECK (true);
```

## Step 3: Get Your API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** section
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 4: Update Your App

Open `src/services/supabase.js` and replace:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

With your actual credentials from Step 3.

## Step 5: Access Your Dashboard

Your Supabase dashboard is at: `https://app.supabase.com/project/YOUR_PROJECT_ID`

From there you can:
- **Table Editor**: View and edit data directly
- **SQL Editor**: Run custom queries
- **Database**: See table structure
- **API Docs**: Auto-generated API documentation
- **Logs**: Monitor database activity

## Database Schema

### Customers Table
- `id`: Unique identifier
- `phone`: Phone number (unique)
- `name`: Customer name
- `created_at`: When customer was first added
- `updated_at`: Last update time

### Orders Table
- `id`: Unique order identifier
- `customer_phone`: Customer's phone number
- `customer_name`: Customer's name
- `order_type`: Type of order ('book', 'print', 'advanced_print')
- `order_details`: JSON object with order specifics
- `total_price`: Order total
- `status`: Order status ('pending', 'completed', 'cancelled')
- `created_at`: Order creation time

## Example Order Details JSON

### Book Order:
```json
{
  "level": "الثالث الثانوي",
  "subject": "رياضيات",
  "teacher": "أحمد محمود",
  "type": "مذكرة",
  "price": 50
}
```

### Print Order:
```json
{
  "paperCount": 100,
  "paperSize": "A4",
  "color": "bw",
  "sidedness": "double",
  "binding": "spiral",
  "copies": 2,
  "totalPrice": 125.50
}
```

## Next Steps

Once configured, the app will automatically:
- Save customer data when they make orders
- Store all order information
- Allow you to view/manage everything from the Supabase dashboard
