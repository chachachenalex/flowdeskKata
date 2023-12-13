# FlowdeskKata

# Aim of this project:

This project is created to fetch the BTC/USDT order book from the 3 exchanges written above and compute for each orderbook a mid-price.
The exchanges can be configurable by rewriting the exchanges.json

# NB:
# DB:
this project use typeorm framework to manage the database of mysql which is used to store the mid price data with time once fetch the bid and ask price
# Unit Tests:
this project use framework of jest for the unit tests
# config file for exchange:
all the information of configuration of exchange can be found in eexchanges.json, you can add / delete / modify the exchange(s) as you want
