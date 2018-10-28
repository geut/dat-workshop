# 4 - It's all about streams 

## Quick introduction to streams

Well, if you have written even a small node.js app, chances are, that you have used [streams](https://nodejs.org/api/stream.html) somewhere in the road, being aware of it or not.

In fact, `streams` are part of the node.js core. Every _request_ or _response_ from a server, every `console.log` or filesystem operation are using streams in one way or another. :boom:

We can picture a stream as an interface for a data _flow_ `a---b---c` which can change over _time_ and where data flows from a _source_ to a _destination_. 

For example, using `streams` we can read a file by _chunks_ making use of a `ReadableStream`, apply some kind of _transformation_ with a `TransformStream` and finally, write every _chunk_ of data into a specific destination using a `WritableStream`. 

Some `streams` operate in a single way, like a `ReadableStream` which only _reads_ from a _source_ and pass the data to the next stream:

```
ReadableStream ---> ( DuplexStream | TransformStream ) ---> WriteableStream
```

Other type of `streams` can operate in bi-directional manner, ie, can perform _reads_ and _writs_. This `streams` are known as `DuplexStream`. One example is the well known [Socket](https://nodejs.org/api/net.html#net_new_net_socket_options).

!> It is important to have in mind that this kind of _interfaces_ exists only to define a common, scalabel and efficient way to communicate data. `streams` help us to abstract the source and destination. It does not matter if we are reading or writing from/to a file or if it is the net. `streams` **speaks a unique language** and this allows us to **combine them** the way we needed.

:link: If you want to keep on learning about streams, we recommend you the 
[stream-handbook](https://github.com/substack/stream-handbook).

## Streams in Hypercore

On the inside, `hypercore` uses streams to work.

### Reading the logs 

We can read our `feed` using `feed.createReadStream` and display that info on the console using `process.stdout`:

```javascript
feed.createReadStream().pipe(process.stdout)
```

As you can see, we are using the `pipe` method to _connect_ and define our data flow in our streams.

```javascript
// a --> b --> c
// unix like: a | b | c
a.pipe(b).pipe(c)
```

### Replication 

Ok, let's suppose we have local feed and a remote public key. At some point we want to read data from this other feed, since we have it's PK, we can decrypt them.

But before decrypt them, we need to fetch and merge them into our local feed. This process is called `replication`.

![replicant scene from blade runner](https://media.giphy.com/media/xtpNfxNz7rTSo/giphy.gif)

We want to _replicate_ remote feeds data into our local feed.

In order to do this, we are going to use streams. Hypercore API has a `feed.replicate()` method which returns a _replication stream_ that reads the remote feed, sync it with the local feed and finally pass the result to the next stream. In other words, it behaves like a `DuplexStream`.

![replicate](images/replicate.png)

### Sync 

With `replicate()` we can combine the _remote feed_ with our _local feed_ but we need to be aware of out of date data in our _remote feed_.

!> Eventually, all the peers should have the same (up to date) data.

If we see the conection between two peers as a bi-directional connection, we can do the following:
```javascript
//                (1)                      (2)
remoteFeed.pipe(localFeed.replicate()).pipe(remoteFeed)
```
1. First, data is received from the remote feed and replicated into our local feed.
2. Once our feed is updated, data is sent to the remote feed. This is made to ensure consistency.
3. Finally, both feeds have the same data.

## Exercise 

We are going to simulate reading messages from another peer. To do that we need to:

1. Sync local feed with remote one.
2. Once sync is done, read data from our local feed and push each message into an array.
3. When we finish reading our feed, we need to return the messages list.

## Test

```
$ npm test ./04
```

## Tips

### 1 - Pump

By design, if we have streams connected by `.pipe` and one of them fails, the rest keep working.

This can lead to multiple error conditions. We want to destroy all the streams if one fails. That's why we are going to use 
[pump](/pump) instead of `.pipe`.

!> As an extra feature, with `pump` we can pass a function to the last argument. This function will be executed when all the streams finish.

```javascript
a.pipe(b).pipe(c)

// becomes

pump(a, b, c, err => {
  console.log('all streams have finished')
})
```

### 2 - Reading/Writing data 

A `WritableStream` can iterate through all the _chunks_ of data flowing in our streams and we can write them wherever we want, eg: filesystem, network, memory, etc. 

We have made a special function: `forEachChunk`, which can be seen as a little helper to write data (and of course, it is a `WritableStream`)
