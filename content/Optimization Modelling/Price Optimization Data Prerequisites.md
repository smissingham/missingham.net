
Below are outlines for the data structures commonly required for price optimization.

Note, some tables and columns herein are marked as required/recommended/bonus.
Despite this, the more data that is provided, the more meaning can be derived from the data and the better potential optimization results can be achieved.
## Customers - Required
One row per Customer ID, brings additional customer hierarchy context

Required Columns:
- Customer ID (must match/join to transactions table)
- Customer Name
- Customer Hierarchy (and/or any customer attributes that link to price, discount etc.)
	- Eg: 
		- Customer Segment
		- Customer Class
		- Customer Category
		- etc.

Recommended Extras:
- Bill-to Customer ID (the customer buying/paying for the product, if different from the receiver)
- Ship-to Customer ID (the customer address that is receiving the goods, if different from Bill-To)

## Products - Required
One row per Product ID, brings additional product hierarchy context

Required Columns:
- Product ID (must match/join to transactions table)
- Product Name
- Product Hierarchy (and/or any product attributes that link to price, discount etc.)
	- Eg: 
		- Product Segment
		- Product Class
		- Product Category
		- etc.

## Transactions (Sales Line-Items) - Required
The fundamental data table required for modelling optimization of price, margin, discount etc.

Required Columns:
- Invoice ID (the unique identifier of an invoice)
- Invoice Line ID (the line number on the corresponding invoice)
- Customer ID (should match/join to "Customers" table)
- Product ID (should match/join to "Products" table)
- Invoice Date
- Invoice Price
- Invoice Qty
- Cost Price at time of invoice (can be derived from costs table if provided)

Recommended Extras:
- Product List Price at time of invoice (can be derived from list prices table if provided)
- Customer Standard Discount (can be derived from another table if provided)
- Quote ID / Quote Line ID (if quotes are provided, this will join quotes table to transactions)

## List Prices History - Recommended
A table containing historic list price points that can be joined to transactions in order to derive discount given at time of invoice.

Columns:
- Product ID (must match/join to transactions table)
- Effective Date
- Expiry Date
- List Price
## Cost Prices History - Recommended
The same as List Prices History, but for cost prices. Both might be combined in same table.

Columns:
- Product ID (must match/join to transactions table)
- Effective Date
- Expiry Date
- Cost Price

## Quotes - Bonus
A table of quote line-items, that can be joined to transactions to derive the quoted vs. ordered price and qty for sales where a quote was generated. 

Columns:
- Quote ID (the unique identifier of an quote)
- Quote Line ID (the line number on the corresponding quote)
- Invoice Line ID (must match/join to transactions)
- Quoted Quantity
- Quoted Price