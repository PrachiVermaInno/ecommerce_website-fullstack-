INSERT INTO product (name, description, price, image_url, category)
VALUES
('Men''s Cotton Jacket', 'Lightweight jacket for everyday wear.', 55.99, 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', 'men''s clothing'),
('Casual Slim Fit T-Shirt', 'Slim-fit casual t-shirt for all occasions.', 22.3, 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', 'men''s clothing'),
('White Gold Plated Princess Ring', 'Premium gold-plated ring with elegant design.', 9.99, 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', 'jewelery'),
('Solid Gold Petite Micropave Bracelet', 'Delicate bracelet with fine gold work.', 168, 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 'jewelery'),
('WD 2TB External Hard Drive', 'Reliable storage with USB 3.0.', 64, 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', 'electronics'),
('Samsung 49-Inch Monitor', 'Curved gaming monitor with 144Hz refresh rate.', 999.99, 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', 'electronics'),
('Women''s Casual Dress', 'Beautiful and comfortable casual dress.', 39.99, 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', 'women''s clothing'),
('Women''s Winter Coat', 'Warm winter coat with stylish design.', 59.99, 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg', 'women''s clothing');

INSERT INTO promo_code (code, discount_value, is_percentage, is_active)
VALUES
('SAVE10', 0.10, true, true),
('FLAT50', 50.00, false, true);
