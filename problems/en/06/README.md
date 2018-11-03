# 6 - Writing messages

An essential part of the API of Sage is the possibility to write messages in
the db.

Hyperdb provides different methods for writing data in the db, one of these is:

```javascript
  db.put(key, value, cb)
```

Like we said earlier, hyperdb is a key-value database, that means if we execute
 `.put('/test', 'hi!')` the valu stays saves in the key `/test`.

:microscope: See the `/` that we add to the key? `Hyperdb has support for namespaces` similar to _redis_. 

We can, for example, read all the values related to a particular _namespace_
and their _subfolders_:

```javascript
db.put('/test/1', 'hi')
db.put('/test/2', 'how are you?', () => {
  db.createReadStream('/test').pipe(printInConsole)
})

// console:
// [ Node(key=test/1, value='hi', seq=1, feed=0)) ]
// [ Node(key=test/2, value='how are you?', seq=2, feed=0)) ]
```

## Exercise 

Define two new instance methods for Saga

1. `ready -> Promise`
A method that returns a promise and that can resolve itself when the db is
`ready`.
2. `writeMessage(message: string) -> Promise`
A method that receives as a parameter a `string` and returns a **Promise**.

But we have to take into account a few more things:
  - The **promise** resolves itself when it terminates the writing operation
    and has returned the message key 
  If the writing fails, we have to make a `reject` with the error
  - We can't just save the message if we don't also have aditional information
    over the same key:
  `{ key, message, username, timestamp }`
  - The messages have to be saved below the namespace `/messages/<messageKey>`.
  - The keys have to be unique.

## Test

```
$ npm test ./06
```

## Tips

- The best way to define a unique key is to use some ID generator. We recommend
  that you look at [hyperid](hyperid)

