require('dotenv').config();
const mysql = require('mysql');
const Table = require('easy-table')
const inquirer = require('inquirer');

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: "bamazon",
	connectionLimit : 10,
});

// SQL Queries
const SELECT_ALL_PRODUCTS = 'SELECT item_id, product_name, price, stock_quantity FROM products';
const BUY_PRODUCT = 'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?';
const SELECT_SPECIFIC_PRODUCT = 'SELECT * FROM products WHERE item_id = ?';

function main() {
	inquirer
	.prompt({
		name: 'who',
		type: 'list',
		message: 'Who are you?',
		choices: ['Customer', 'Manager', 'Supervisor', new inquirer.Separator(), 'Exit'],
	})
	.then(answers => {
		const { who } = answers;
		switch (who) {
			case 'Customer':
				return customerMenu();
			case 'Manager':
				console.log('\nNot yet implemented!\n');
				return main();
			case 'Supervisor':
				console.log('\nNot yet implemented!\n');
				return main();
			case 'Exit':
				console.log('\nBye!\n');
				return pool.end();
			default:
				return pool.end();
		}
	})
	.catch(err => { if (err) throw err; });
}

function customerMenu() {
	pool.query(SELECT_ALL_PRODUCTS, (error, results) => {
		if (error) throw error;
		displayProductsTable(results);
		buyMenu(results);
	});
}

function buy(itemId, amount) {
	pool.query(BUY_PRODUCT, [ amount, itemId ], error => {
		if (error) throw error;
		pool.query(SELECT_SPECIFIC_PRODUCT, itemId, (error, results) => {
			if (error) throw error;
			for (const product of results) {
				const { product_name, price } = product;
				console.log(`

Bought ${amount} of ${product_name} for a total of ${price * amount} USD.

`);
			}
			main();
		});
	});
}

function displayProductsTable(products) {
	var t = new Table;
	for (const product of products) {
		const { item_id, product_name, price, stock_quantity } = product;
		t.cell('Product Id', item_id)
		t.cell('Name', product_name)
		t.cell('Unit Price', price)
		t.cell('Quantity', stock_quantity)
		t.newRow()
	}
	console.log(t.toString())
}

function buyMenu(products) {
	inquirer
	.prompt({
		name: 'itemId',
		type: 'number',
		message: 'What is the ID of the product you would like to buy:',
		validate: input => {
			return new Promise((resolve, reject) => {
				for (const product of products) {
					const { item_id } = product;
					if (item_id == input) resolve(true);
				}
				reject('Please enter a valid Product Id.');
			});
		}
	})
	.then(answers => {
		const { itemId } = answers;
		inquirer
		.prompt({
			name: 'amount',
			type: 'number',
			message: 'How many would like to buy:',
			validate: input => {
				return new Promise((resolve, reject) => {
					for (const product of products) {
						const { item_id, stock_quantity } = product;
						if (item_id === itemId && stock_quantity >= input) resolve(true);
					}
					reject('Insufficient quantity!');
				});
			}
		})
		.then(answers => {
			const { amount } = answers;
			buy(itemId, amount)
		})
		.catch(err => { if (err) throw err; });
	})
	.catch(err => { if (err) throw err; });
}

main();
