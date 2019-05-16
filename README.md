# bamazon
## DB Setup
Create a `.env` file with info to connect to your mysql database.

For example:
```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=bamazon_user
MYSQL_PASS=thatsanicepassword!
```
Then apply schema and seeds from mysql.
```
mysql> source bamazon_schema.sql
mysql> source bamazon_seeds.sql
```
## App Setup 
```
$ npm install
```
## Run App 
```
$ npm start
```