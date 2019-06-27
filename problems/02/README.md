# 2 - Hypercore: one log to rule them all

[Hypercore](hypercore) is a fundamental module in Dat's ecosystem.

It works as an [append-only log](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying) providing all the mechanisms necessary to work with and share big volumes of data in a distributed and secure manner.

First, let's take a look at what `hypercore` looks like. It's just a function we can call and will return a [feed](/terms).

```javascript
const hypercore = require('hypercore')
const feed = hypercore('./my-first-dataset', {valueEncoding: 'utf-8'})
```
## Exercise

1. Write a function that returns an hypercore `feed` using a memory `storage`.
1. Setup the instance for handling `json` data.
1. Before returning the `feed`, add the following object: `{ title: 'dat-is-freedom' }`.

## Tips

1. `hypercore` takes as a first parameter a function that defines the `storage`. This function must follow the [random-access-storage](/random-access-storage) interface.
1. If we give hypercore a _filepath_ instead of a `storage` function, `hypercore` will use [random-access-file](/random-access-file) as a default storage.
1. If you take a look into the `hypercore` options you will see that we can specify the type of [codec](/codecs) to use for parsing the data.

<!-- tabs:start -->
## **Test**

```
$ npm test ./02
```

[test.js](./test.js ':include')

## **Solution**

[solution.js](./solution.js ':include')

<!-- tabs:end -->
