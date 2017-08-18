# Stock-Watcher
A simple web application for a user to add stock ticker.
The user enters the symbol of their desired stock eg. "GOOG" or "AAPL" into a text field. When they click "Add" the basic stock data is added to the dashboard.

The following Yahoo API is used to retrieve the stock data: http://developer.yahoo.com/yql/console/?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'GOOG'&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

