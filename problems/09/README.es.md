# 9 - Descubriendo el mundo :globe_with_meridians:

:hatched_chick: Wow lo estas haciendo muy bien! Estamos muy cerca de entrar en la recta final del workshop, donde vamos a saltar a poner todos estos conocimientos en práctica en nuestro chat.

Pero antes, vamos a estudiar un ultimo feature de Dat que hemos pasado por alto hasta el momento. Se trata de la vieja pregunta; **¿cómo encontramos a otres peers?**

Ultimamente venimos usando bastante hyperdb, pero el descubrimiento en Dat es resuelto por hypercore.

Podemos dividir al descubrimiento en 2 partes:

- A nivel de red, digamos mas de una forma "física", como se arma el _swarm_ (esto es, el conjunto de peers).
- Luego tambien podemos pensar el descubrimiento "a nivel de datos", es decir, buscar información entre los pares. Para resolver esto, Dat utiliza algunas estructuras de datos comos [trie](https://en.wikipedia.org/wiki/Trie) y [merkle trees](https://en.wikipedia.org/wiki/Merkle_tree) que les permiten obtener datos de forma altamente eficiente (recordemos que Dat esta diseñado para compartir grandes volumenes de datos minimizando la cantidad de info que se necesita mover entre pares).

Pero vamos a enfocarnos en como se arma el enjambre o _swarm_ :honeybee:. Para lograrlo, hypercore utiliza el modulo: [`discovery-swarm`](https://github.com/mafintosh/discovery-swarm) que a su vez utiliza a [`discovery-channel`](https://github.com/maxogden/discovery-channel).

Dat tiene tres estrategias para armar el _swarm_ de peers:

1. Búsqueda de peers en la red local. `discovery-channel` hace uso de un modulo llamado ['dns-discovery'](https://github.com/mafintosh/dns-discovery) que tiene la capacidad de hacer consultas en la red local usando multicast dns (MDNS).
2. Si no encontramos localmente, vamos a internet. El siguiente paso es buscar usando dns, tambien haciendo uso de `dns-discovery`.
3. Si esos metodos fallan, vamos a buscar en un DHT o _hash distribuida_. Para esto `discovery-channel` hace uso de [bittorrent-dht](https://github.com/webtorrent/bittorrent-dht).

Los dos primeros metodos son rapidos. En el metodo 2 y 3 aparece un punto a tener en cuenta, _son centralizados de alguna forma_. ¿Qué queremos decir con esto? ¿Acaso no estamos en un workshop P2P?

![the dude asking wtf](https://bukk.it/dudewtf.gif)

### bootstrap nodes

La mayoria de las soluciones descentralizadas haran uso de bootstrap nodes. Los bootstrap nodes funcionan como nodos o _peers_ conocidos de antemano que usaremos para empezar a conocer a los demas y así formar nuestra propia idea de como es el _swarm_.

En otra palabras, necesitamos conocer a alguien para entrar a la red.

De hecho, Dat mantiene sus bootstrap nodes en un modulo aparte: [dat-swarm-defaults](https://github.com/datproject/dat-swarm-defaults).

## Qué ocurre en la web?

Hemos visto conceptos especificos a Dat, que funcionan de maravillas en la línea de comandos. Pero en este workshop queremos crear una aplicación web.

Cuando trabajamos con aplicaciones P2P, rompemos el concepto de `client <-- servidor` al que podemos estar acostumbradas. Las aplicaciones P2P son utiles en otras arquitecturas, un tip es que podemos pensar a cada participante tanto como cliente **y** servidor, donde la comunicación fluye entre pares: `C/S <--> C/S <---> C/S`.

Para lograr este efecto en la web usaremos **webrtc**. webrtc es una tecnologia que nos permite, entre otras cosas, comunicación directa entre peers.

Cabe mencionar, que webrtc tambien hace uso de bootstrap nodes. Un modulo interesante para crear un bootstrap node es [signalhub](https://github.com/mafintosh/signalhub).

## Ejercicio

> Preambulo: Vamos a empezar a conectar las partes :electric_plug:. En este ejercicio tendremos que trabajar con dos archivos. Uno es `chat.js` y el otro es `index.js`, donde venimos trabajando con `Saga`. `chat.js` hará uso de `Saga` y es donde crearemos el _swarm_.

1. En el archivo `chat.js` vamos a crear un _swarm_. Usaremos un modulo de GEUT: [discovery-swarm-webrtc](/geut-discovery-swarm-webrtc) para hacerlo :cool:.
Hay [dos parámetros](/geut-discovery-swarm-webrtc#const-sw-swarmopts) importantes que debemos tener en cuenta para pasarles al constructor:
  - id: `Saga` expone la instancia de hyperdb, de ahí podemos obtener el [feed local](/hyperdb#dblocal) y de ese feed la `key` (en hexadecimal). Esto es lo que debemos pasarle, un identificador único de nuestro feed.
  - stream: un stream para replicar con otros peers. Por suerte `Saga` expone un método `replicate`. :wink:
2. Luego vamos a crear una instancia de `signalhub`. El constructor recibe dos parametros, uno de ellos ya lo tenemos, `signalUrls`; el otro, que debemos completar, es usado como _namespace_, aquí usaremos la `discoveryKey` (en hex tambien) de hyperdb.
3. Solo nos falta conectar con `Saga`. En este punto **(3)**, tenemos el _swarm_ listo. _swarm_ emite eventos, uno de los mas importantes es `connection`. Esto indica cuando tenemos un nuevo _peer_ conectado :boom:. Cuando esto ocurre debemos informar a `Saga`. Agreguemos aquí el llamado a un **nuevo** método (ahora vamos a implementarlo :wink:) de `Saga`: `connect(peer)` que recibe un peer como parámetro.
4. Del lado de `Saga` solo nos falta implementar el nuevo método `connect`. Vamos al archivo `index.js`. `connect` recibe un `peer` como parámetro. `peer` es un objeto con una propiedad que nos interesa, `remoteUserData`. De ahí vamos a obtener los datos y la `key` (PK) del nuevo `peer`. Recuerdan el ejercicio anterior? debemos **autorizarlo** usando esta info.

## Test

```
$ npm test ./09
```

## Tips

- GEUT al rescate. Usaremos un modulo de GEUT: [discovery-swarm-webrtc](/geut-discovery-swarm-webrtc) para crear el swarm. Este modulo mantiene una API muy similar a `discovery-swarm`.

## Extra :books:

- Les recomendamos este [artículo](https://rangermauve.hashbase.io/posts/how-dat-discovers-peers) de [Ranger Mauve](https://mobile.twitter.com/RangerMauve)

___
Woow eso fue bastante, pero ya estamos cerca de poner todo esto en acción :rocket:

![dancing buddies](https://bukk.it/lineup.gif)
