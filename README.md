# bamazon

### Bamazon Customer

Using the command **node bamazonCustomer.js**

Customers can view all available products for sale.

By entering in the **Item ID**, the customer will be given the option to enter in the quantity they'd like to purchase.

If stock is available, the customer will receive a response that the order went through and the total price.  Otherwise, the customer will receive a response of Insufficient Quantity.

### Bamazon Manager

Using the command **node bamazonManager.js

The manager will be given 4 options to pick from

**View Products for Sale** will display all product information available for sale.

**View Low Inventory** will display all products with less than 5 items in stock.

**Add to Inventory** will allow managers to add additional inventory.
    _First Prompt_ will require the manager to select the product ID they would like to add stock to.
    _Second Prompt_ will require the manager to enter in the amount of additional stock to be added.
    
**Add New Product** will allow managers to add a new product for sale.
  _First Prompt_ will require the manager to provide the name of the item to be added.
  _Second Prompt_ will require the manager to provide the department
  _Third Prompt_ will require the manager to provide the price per unit
  _Fourth Prompt_ will require the manager to provide how much inventory is being added.
  
