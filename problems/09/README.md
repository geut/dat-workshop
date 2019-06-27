# 9 - Discovering the world :globe_with_meridians:

:hatched_chick: Wow no you have done really well! We are really close to entering the final round of the workshop, where we are going to jump to put all that we've learned in practice in our chat app.

But first, we are going to study the last feature of Dat that we have skipped
until now. It is about the old question; **who do we find other peers?**

We have looked mostly at using hyperdb, but the discovery in Dat is resolved by
hypercore.

We can devide the discovery into two parts:

- At the network level, let's say the "physical" form, is how we create the
  _swarm_ (this is the group of peers).
- Then we can also think of the discovery at the level of data, or to say, to
  search for information between the peers. To resolve this, Dat uses data
structures like [tries](https://en.wikipedia.org/wiki/Trie) and [merkle trees](https://en.wikipedia.org/wiki/Merkle_tree) which let us get data in a highly efficient way. remember that Dat is designed to share big volumes of data, minimizing the quantity of data that is moved between peers.

But we are going to focus on how we create the _swarm_ :honeybee:. To achieve
this, hypercore uses the module [`discovery-swarm`](https://github.com/mafintosh/discovery-swarm) which in turn uses [`discovery-channel`](https://github.com/maxogden/discovery-channel).

Dat has three strategies to connect the _swarm_ of peers:

1. Find the peers in the local network. `discovery-channel` uses a module
   called ['dns-discovery'](https://github.com/mafintosh/dns-discovery) that has the ability to make queries in the local network using multicast dns (MDNS).
2. If we don't find eachother locally, we go to the internet. The next phase is
   to search using dns, also with `dns-discovery`.
3. If these methods fail, we are going to look in a DHT or _distributed hashtable_. For this, `discovery-channel` uses [bittorrent-dht](https://github.com/webtorrent/bittorrent-dht).

The first two methods are fast. In the 2nd or 3rd method a point appears to
have in mind, _they are centralized in some way_. What does that mean? Maybe we
aren't in a P2P workshop?

![the dude asking wtf](https://bukk.it/dudewtf.gif)

### bootstrap nodes

Most of the decentralized solutions use bootstrap nodes. The bootstrap nodes
function like known _peers_ beforehand, that we use to start to know others and
like this form our own _swarm_.

In other words, we need to know someone to enter the network.

In fact, Dat maintains it's bootstrap nodes in a separate module: [dat-swarm-defaults](https://github.com/datproject/dat-swarm-defaults).

## What happens on the web?

We have seen specific concepts of Dat, that function wonders in the
commandline. But in this workshop we want to create a web application.

When we work with P2P applications, we break the concept of `client <-- server`
that we are accustomed to. P2P applications are useful in other architectures,
if we can think of each participant as a client **and server** where the
communication flows between pairs `C/S <--> C/S <--> C/S`.

To achieve this effect in the web we use **webrtc**. webrtc is a technology
that allows us, among other things, communicate directly between peers.

It's fit to mention that webrtc also is used by bootstrap nodes. An interesting
module to create a bootstrap node is [signalhub](https://github.com/mafintosh/signalhub).

## Exercises

> Introduction: Let's start by connecting the parts :electric_plug:. In this exercise, we will work with two files. One is `chat.js` and the other is `index.js`, where we were working with `Saga`. `chat.js` will use `Saga` and is where we will create the _swarm_.


1. In the `chat.js` file we are going to create a _swarm_. We will use a module
   by GEUT: [discovery-swarm-webrtc](/geut-discovery-swarm-webrtc) to do it :cool:.
There are [two important parameters](/geut-discovery-swarm-webrtc#const-sw-swarmopts) that we have account for in the constructor:
  - id: `Saga` exposes the hyperdb instance, and from there we can obtain the expone [local feed](/hyperdb#dblocal) and from this feed the `key` (in hexadecimal). This is what we have to pass to it, a unique identifer of our feed.
  - stream: a stream to replicate with other peers. Luckly `Saga` exposes a `replicate` method. :wink:
2. Then we are going to create a `signalhub` instance. The constructor receives two parameters, one of them we already have, `signalUrls`; the other, which we have to complete, is used like a _namespace_, here we will use the `discoveryKey` (in hex too) in hyperdb.
3. We now only lack to connect to `Saga`. In point **(3)**, we have the _swarm_ ready. _swarm_ emits events, one of the most important parts is `connection`. This indicates when we have a new connected _peer_ :boom: When this occurs we have to tell `Saga`. We will add here a **new** method (now we are going to implement it :wink:): `connect(peer`) which receives a peer as a parameter.
4. On the `Saga` side, we haven't implemented the new `connect` method. Let's go to the `index.js` file. `connect` receives a `peer` as a parameter. `peer` is an object with a property that interests us, `remoteUserData`. From there we will get the data and the `key` (PK) of our new `peer`. Remember the earlier exercise? We will **authorize it** using this info.

## Tips

- GEUT will rescue you. We will use a module from GEUT: [discovery-swarm-webrtc](/geut-discovery-swarm-webrtc) to create tehs warm. This module maintains an API very similar to `discovery-swarm`.

<!-- tabs:start -->
## **Test**

```
$ npm test ./09
```

[test.js](./test.js ':include')

## **Solution**

[solution.js](./solution.js ':include')

<!-- tabs:end -->

## Extra :books:

- We recommend this [article](https://rangermauve.hashbase.io/posts/how-dat-discovers-peers) by [Ranger Mauve](https://mobile.twitter.com/RangerMauve)

___
Woow this was a lot, but now you're already close to putting everything in action :rocket:

![dancing buddies](https://bukk.it/lineup.gif)
