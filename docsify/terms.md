# Terminologia

## feed
Nuestra instancia de hypercore es un feed de datos. Los feeds son estructuras de datos que
pueden ser compartidas y sincronizadas por medio de una red.

## owner
Peer que tiene permisos de escritura en el feed. Es decir, que tiene una secret key para escribir en el feed
o que su public key fue autorizada en una instancia de Hyperdb.

## pipe
Termino que recibe el conectar 2 o mas streams.
```
a | b | c
```

## replicar stream
Los feed pueden crear con `replicate()` un stream que puede ser conectado (piped) a un peer con un feed remoto.
Es utilizado para sincronizar feeds.

## swarm
Podemos definir a un swarm como un grupo de peers conectados para un proposito, servicio o recurso mutuo.

## peer
Llamamos peer a cualquier nodo con IP:PORT conectado a un red.
