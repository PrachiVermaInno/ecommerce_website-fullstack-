-- =============================
-- 🚀 Product Table Data
-- =============================
INSERT INTO product (title, description, price, category, image)
VALUES
('Fjallraven Backpack',
 'Perfect for daily use and outdoor walks. Stash your laptop and essentials with comfort.',
 109.95,
 'bags',
 'https://images.unsplash.com/photo-1585386959984-a41552231693?w=350&h=350&fit=crop'),

('Mens Casual Jacket',
 'Premium cotton jacket designed for style and comfort. Ideal for everyday wear.',
 120.00,
 'clothing',
 'https://images.unsplash.com/photo-1602810318383-e386cc2a3a2f?w=350&h=350&fit=crop'),

('Slim Fit T-Shirt',
 'Soft, breathable cotton t-shirt perfect for summer. Available in multiple colors.',
 22.30,
 'clothing',
 'https://images.unsplash.com/photo-1584277262794-4b4b9d09e7f5?w=350&h=350&fit=crop'),

('Mens Sneakers',
 'Lightweight running shoes with superior cushioning and flexible design.',
 95.99,
 'footwear',
 'https://images.unsplash.com/photo-1606813902914-0d4cf6c85b8f?w=350&h=350&fit=crop'),

('Women’s Handbag',
 'Elegant leather handbag with spacious interior and adjustable strap.',
 145.50,
 'accessories',
 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=350&h=350&fit=crop'),

('Analog Wrist Watch',
 'Stylish analog wristwatch with waterproof design and stainless steel body.',
 180.00,
 'accessories',
 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=350&h=350&fit=crop'),

('Wireless Headphones',
 'Noise-cancelling over-ear headphones with 20 hours of playback time.',
 250.00,
 'electronics',
 'https://images.unsplash.com/photo-1580894906475-77c92f44b9c7?w=350&h=350&fit=crop'),

('Smartphone',
 'Latest-gen smartphone with 6.7-inch display, triple cameras, and long-lasting battery.',
 699.99,
 'electronics',
 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=350&h=350&fit=crop');



-- =============================
-- 🚀 Promo Code Table Data
-- =============================
INSERT INTO promo_code (code, discount, valid_until)
VALUES
('SUMMER10', 10.00, CURRENT_DATE + INTERVAL '30 days'),
('FLAT50', 50.00, CURRENT_DATE + INTERVAL '60 days'),
('WELCOME15', 15.00, CURRENT_DATE + INTERVAL '90 days');
