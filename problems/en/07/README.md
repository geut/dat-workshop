# 7 - Messages in real time :watch:

Ok :cool:, we have already written messages using our `Saga` API. at some point
these messages replicate and arrive at each connected peer.

...But we also need to have the power to read the messages of our database. And
not only that, we will need to read those messages in _real-time_. We want
`Saga` to detect when the user receives/writes a message in the chat.

The next exercise achieves this objective: **to read messages in real-time**.

## Exercise

1. `Saga` now has a method `initialize`, we need that once our db is `ready`
   our db updates the messages. This means, read the last messages from the
hyperdb and add those to our message `Map`.
1. Once we have this list, we should call the function that listens to the new
   changes in the db and 
en nuestra db y ante un cambio llame nuevamente al update de mensajes. De esta forma resolveríamos el problema de _real-time_.
1. Each new message that `Saga` encounters would emit a new `message` event
   with the key of the message as arguments.
1. We will find a way to be efficient when updating messages, to finish the
   update when it seems necessary. We don't want to werun the entire stream
each time there is a change.

## Test

```
$ npm test ./07
```

## Tips

1. To read the hyperdb we recommend you use `createHistoryStream` and iterate over the messages in **eeverse** order.
1. Now `Saga` extends EventEmitter, that means that it has all the
   functionality to emit events.
1. When we want to finalize a stream we can call `destroy()`. If the stream
   forms part of a chain of connected streams with `pump`, calling `destroy`
would cause each connected stream to end.
1. Remember that `pump` accepts as it's final parameter a function that will be
   executied when all the streams end.
1. Don't forger to have at hand the documentation of [hyperdb](hyperdb) :shipit:
1. You can ask us anything! :rainbow:

