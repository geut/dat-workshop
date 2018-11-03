# 1 - Dat Cli
> A distributed **dat**a community

## Instalación

```
$ npm install -g dat
```

## Compartiendo archivos

_Entrando en calor_. Hagamos un recorrido rápido por las [_features_](dat) que nos ofrece Dat mediante el uso de su CLI.
Para esto vamos a compartir contenido, modificarlo y sincronizarlo. Tambien veremos como podemos obtener contenido especifico.

### dat share

Dat cuenta con el comando [share](dat#sharing-data) para compartir directorios.

### dat sync

La otra mitad de la historia sobre compartir archivos es descargarlos. Para esto veremos la _feature_ [clone](dat#downloading-data). Para saber *qué* data vamos a descargar necesitaremos una dirección dat o _dat link_.

## Ejercicios

Formaremos grupos de 2 personas :smiley_cat: :smile_cat:.

Junto a este readme encontrarán un directorio `/cool_cats` con información de suma importancia para compartir :laughing:.

### 1- Compartir

Uno de ustedes será el encargado de compartir nuestro directorio `/cool_cats`.

### 2 - Clonar

La otra persona será quien clonará el dat, usando el dat link que le facilito su compa.

### 3 - Crear nuevo contenido

Uno de ustedes creará un archivo nuevo dentro del directorio compartido. Llamaremos a este archivo: `top_secret.md`.
Aquí les dejamos una idea para el contenido:

```
# TOP SECRET

> este archivo no se autodestruira en 5 segundos.

Y esta siendo distribuido. :cool:
```

### 4 - Obtener nuevo contenido

Para hacerlo probemos con el comando [pull](dat#updating-downloaded-archives)

### 5 - Qué ocurre si nuestro compa modifica el archivo?

:wink: sync

### Extra

1. Qué tal si compartimos el dat link con un nuevo compa y solo quiere acceder al archivo `top_secret.md`?

### Tip

1. Podemos combinar la opción _sparse_ con el archivo especial [`.datdownload`](dat#selecting-files)

