USE bamazon;

INSERT INTO departments 
	( department_name, over_head_costs )
VALUES
	( 'Clothing', 1000.00 ),
	( 'Food and Drink', 5000.00 ),
	( 'Footwear', 1000.00 ),
	( 'Jewelry', 1000.00 ),
	( 'Sporting Goods', 1000.00 );

INSERT INTO products
	( product_name, department_name, price, stock_quantity )
VALUES
	( "Prismatic Plate Boots of Health", 'Footwear', 24.99, 100 ),
	( "Doppelganger's Halberd of the Colossus", 'Sporting Goods', 449.99, 6 ),
	( "Weird Amulet of the Colossus", 'Jewelry', 399.99, 5 ),
	( "Overwhelming Giant Axe of Haste", 'Sporting Goods', 299.99, 50 ),
	( "Fine Scale Mail of Regrowth", 'Armor', 199.99, 50 ),
	( "Priest's Full Helm of Protection", 'Hats', 99.99, 50 ),
	( "Skull Cap", 'Hats', 0.99, 1000 ),
	( "Fine Hunter's Bow of Plenty", 'Sporting Goods', 229.99, 50 ),
	( "Chain Boots", 'Footwear', 14.99, 50 ),
	( "Elixir of Damage", 'Food and Drink', 29.99, 50 ),
	( "Halberd of Amelioration", 'Sporting Goods', 74.99, 50 );

SELECT * FROM products;