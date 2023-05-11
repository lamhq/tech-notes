# Dinero.js

## Download/install

```sh
yarn add dinero.js
yarn add @types/dinero.js -D
```

## Quick start

To get started, you need to create a new Dinero instance. Amounts are specified in **minor currency units** (e.g.: "cents" for the dollar). 

You can also specify an ISO 4217 currency code (default is `USD`).

Dinero.js is immutable, which means you'll always get a new Dinero instance when you perform any kind of transformation on it. Your original instance will remain untouched.


### Calculation methods

```js
const price = Dinero({ amount: 5000, currency: 'EUR' })

// returns a Dinero object with amount: 5500
price.add(Dinero({ amount: 500, currency: 'EUR' }))

// returns a Dinero object with amount: 4500
price.subtract(Dinero({ amount: 500, currency: 'EUR' }))

// returns a Dinero object with amount: 4000
Dinero({ amount: 500 })
  .add(Dinero({ amount: 500 }))
  .multiply(4)
```


### Boolean methods

```js
// returns true
Dinero({ amount: 500 }).equalsTo(Dinero({ amount: 500 }))

// returns false
Dinero({ amount: 100 }).isZero()

// returns true
Dinero({ amount: 1150 }).hasCents()
```

### Formatting

```js
// returns $5.00
Dinero({ amount: 500 }).toFormat('$0,0.00')
```

### Specifying defaults

```js
// The Iraqi dinar has up to 3 sub-units
Dinero.defaultCurrency = 'IQD'
Dinero.defaultPrecision = 3

// represents IQD1
Dinero({ amount: 1000 })
```