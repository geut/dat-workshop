# 8 - Otherizing other peers :horse: :hamster: :rabbit:

Until now, all that we've seen has involved local tests with our database but
we have not interacted much with the rest of our computers.

It's time to change that.

## Back to hyperdb & hypercore

Remember that we are using hypercore and on top of that, hyperdb. Let's make
a quick pass over both, until know we know that

- Dat is _singlewriter_, for now.
- `hypercore` is the :heartpulse: of Dat.
- `hypercore` allows us to create a _feed_ (data structure) where we can write/read and share. 
- Each _feed_ gives us a public key that can serve to identify it (and us). 
- A _feed_ can be seen like an _append-only log_.
- `hyperdb` is a db that operates over a **group** of feeds (hypercores).
- `hyperdb` allows DAt to support _multiwriter_

## How can we let other peers write on our feed? 

It works in the following way: an writing operation in the original author's
feed (the creator of our chat, in our case), indicates the peer that wants to
write. The form to identify the peer is through their public key (`PK`), to
say, this peer :horse: could pass their `PK` of their way. 

Internally, hyperdb **writes** in the feed, as if it was another message (but
a special message) which determines a peer :horse: can write.

## Exercise

1. `Saga` should support a new method (API) which permits it to authorize a peer. This method `_authorize` receives a parameter `PK`. 
2. This new method returns a promise that when it resolves successfully,
   delives a string `AUTHORIZED`, and when it rejects, it passes the error
through.

## Test

```
$ npm test ./08
```

## Tips

Usaremos dos métodos de la API de hyperdb:

- [`authorize`](/hyperdb#dbauthorizekey-callback), is used to authorize another peer.
- [`authorized`](/hyperdb#dbauthorizedkey-callback), is used to check if some key was already authorized.


