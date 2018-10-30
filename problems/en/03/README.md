# 3 - The key is the key 

In the last problem, we saw how to create an hypercore feed (and we also mention the word security).

`hypercore` and the whole Dat ecosystem  work by using an asymmetric keys encription scheme to sign and encrypt all the data.

This guarantees data integrity when we share data with another [peer][/terms].

So, let's dive deeper. There are 3 keys to have in mind in the _Dat-verse_ :stars::

### Public Key :key:

This key is **unique**.

It's the key from the dat links: `dat://<public-key>`.

It is used to encrypt/decrypt our messages (data) in a way that only those who have this Public Key (`PK`, for short) will be able to read our feed.

It is our responsibility to share this key only with _well known_ `peers`. 

### Secret Key :closed_lock_with_key:

These days, Dat works following a single-writer / multiple-readers scheme -- i.e, only the feed `owner` (Secret Key's owner) can write the log. 

> We mention single-writer, but that is about to change. The people behind Dat are working on a built-in multi-writer solution. In this workshop we don't want to make you wait for it, so you will see _how_ today. :rocket:.

### Discovery Key :earth_americas:

Later, we will see more about the whole `discovery` concept, but for now let's assume that peers are isolated computers that want to find each other to share some resource, in this case our `feed`.

We could recognize our `feed` by its _unique_ `PK` and allow only the peers who know this key to be able to exchange information.

But it could happen that a "evil" peer takes control of our key allowing it access to our data. :pensive:

To avoid such a scenario (sharing the PK for discovering purposes), Dat make uses of another key, the `discovery key`. This key is used to discover peers without putting our data at risk.  

## Hypercore and the Public Key

As we said earlier, the `PK` is used to encrypt/decrypt data from our feed. That means, that if we own the key from a `remote feed` (another peers feed) we could decrypt and read all the messages on their feed.

To achieve this, `hypercore` accepts a second parameter in its constructor:
```javascript
hypercore(<storage>,<public key>,<options>)
```

> Later, we will see how to sync our local feed with a remote one.

## Exercise 

1. Create a new hypercore feed using the key passed as a parameter. 
2. Return a [Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise#S%C3%BAper_simple_(%C2%A110_l%C3%ADneas!) with the object: `{ publicKey, discoveryKey }`.
  * Each key should be returned converted to `hex`.

### If you have more time... :alarm_clock: 

What would happen if you try to access to the `secretKey`? :speak_no_evil:

## Test

```
$ npm test ./03
```

## Tips

1. Once our feed is `ready` we can have access to the keys.
1. To know if the feed is `ready` we can listen for the `ready` event: `feed.on('ready', ...)`. `hypercore` and many others Dat modules inherit from [EventEmitter](https://nodejs.org/api/events.html) interface.
1. Keys are node.js [Buffers](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end). So, we can use `toString` to cast them to whatever we need.

