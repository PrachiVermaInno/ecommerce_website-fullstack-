
INSERT INTO product (title, price, description, category, image, rating_rate, rating_count)
VALUES
('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.95,
'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.',
'men''s clothing',
'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png'
3.9, 120),

('Mens Casual Premium Slim Fit T-Shirts ', 22.3,
'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight & soft fabric for comfort.',
'men''s clothing',
'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.png',
4.1, 259),

('Mens Cotton Jacket', 55.99,
'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working or hiking.',
'men''s clothing',
'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
4.7, 500),

('Mens Casual Slim Fit', 15.99,
'The color could be slightly different between on the screen and in practice.',
'men''s clothing',
'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
2.1, 430),

('John Hardy Women''s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 695.00,
'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean''s pearl.',
'jewelery',
'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
4.6, 400),

('Solid Gold Petite Micropave ', 168.00,
'Satisfaction Guaranteed. Return or exchange any order within 30 days.',
'jewelery',
'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
3.9, 70),

('White Gold Plated Princess', 9.99,
'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.',
'jewelery',
'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
3.0, 400),

('Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99,
'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.',
'jewelery',
'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
1.9, 100),

('WD 2TB Elements Portable External Hard Drive - USB 3.0 ', 64.00,
'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.',
'electronics',
'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
3.3, 203),

('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109.00,
'Easy upgrade for faster boot up and response. Boosts burst write performance.',
'electronics',
'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
2.9, 470);

INSERT INTO promo_code (code, discount, valid_until)
VALUES
('SAVE10', 0.10, CURRENT_DATE + INTERVAL '30 day'),
('NEW20', 0.20, CURRENT_DATE + INTERVAL '60 day'),
('FLAT50', 0.50, CURRENT_DATE + INTERVAL '90 day');

