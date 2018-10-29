# 5 - From a distributed log to a distributed db

Congratulations :tada::fireworks:!!

If you are here it means you have become a hypercore padawan. It's time to increase your P2P knowledge and follow the road to be a great Jedi.

We just saw that hypercore gives us a distributed log that we can work with. :cool:
But there are situations when that is not enough. Lucky for us, there are more libs written on top of hypercore and one of those is here to help, meet [hyperdb](/hyperdb) :star:

## Hyperdb

Hyperdb offers a key-value distributed over a set of hypercore databases. :cool:

One of the most important features is that it give us the ability to have `multiple-writers`. This takes Dat to the next level, where multiple **previously authorized** users are now able to modify a Dat resource. I.e., **we have multiple owners**.

## A word about what we are building 

In this workshop we are learning how to use Dat to create a _P2P web app_. More specifically, our goal here is to build a P2P chat and its codename will be _Olaf_ :smiley_cat:.

So, to build our chat app we are going to use all the things that we have learned. In this module we are about to introduce a fundamental part, the core of our chat, and it has a codename too: _Saga_ :heart_eyes_cat:.

## Saga

![saga](images/saga.jpg)

We are going to start using hyperdb to build _saga_.

Ok, so first let's define a simple API that permits multiple users to write messages over a distributed hyperdb.

Let's focus on a list of possible requirements our chat can have:

1. We should be able to write messages.
1. We should be able to read messages in _real-time_.
1. We should be able to detect when an user connects and disconnects from a channel (_room_).

Cool, let's start writing this new API, **saga**. :heart_eyes_cat:

## Exercise 

1. Add a constructor to the class `Saga` that receives a `storage`, a `key` and a `username`.
2. With the `storage` and the `key`, create an instance of hyperdb using **json** as the valueEncoding.
3. `Saga` instance should allow us access to:
  * the instance of hyperdb under the prop: `db`
  * the username, under the prop: `username`
  * a users [Map](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map), initially empty, under the prop: `users`.
  * a messages `Map` (initially empty): `messages`.

## Test

```
$ npm test ./05
```

## Tips

1. `hyperdb` offers an API similar to hypercore. :wink:
2. About `Map` usage:
  - a map can have objects for keys :cool:
  - constructor: `new Map([iterable])`
  - important methods:
    - `size()`, for getting the size.
    - `set(key, value)`, for add a new _key_ with _value_.
    - `has(key)`, to know if key exists on map.
    - `keys()`, to get all the keys (array) of the map.
  - Hint: it is :cool: to use `for...of` to iterate over the map.
