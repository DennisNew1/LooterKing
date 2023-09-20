# Looterking

Generic small webapp for generating random loot for pen and paper based on worth of items. This app was created for [Splittermond](https://www.splittermond.de/) a german pen and paper, which means the items are right now based on that rules. With replacing these you will be able to use it for any game you like. 


It is using vue.js and vite. Feel free to use it for yourself. 

## Demo
A demo can be found here (items are german, sorry!): [Click me!](https://www.gm.fh-koeln.de/~mi1933/looterking)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## How does it work?

When you click on "loot!" you will get a list of Items.
You can define a maximal count for items and for the maximal worth of all items together. Neither is guarenteed, you will definetly get items worth less or exactly the amount and maximal count of items you gave. But its entirely possible to get 3 items worth much less or get 1 item exactly worth your amount. The Luck indicator represent how much your items are worth in comparision to the worth-value you gave. 100% means that the items are exactly worth the amount you gave as worth-value.

Imagine the whole thing as you are in the supermarket. The worth-value is what you have in your pocket. The algorithm will randomly put items into your cart, but only those worth equal or less to your worth-value. It will add the items and value "to the cart" and goes on finding items without exceeding the limit of cash you have in your pockets.

## Feature ideas
- keywordlist: giving a filter option, to get only specific items for specific situations or places. Getting only alchemy ingredients when stealing from an alchemist for example. => Done :)
- dropChance:  Giving a dropChance for items.
- encounterRandomizer: random characters and enemies you meet