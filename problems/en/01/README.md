# 1 - Dat Cli
> A distributed **dat**a community

## Playing with the CLI

```
$ npm install -g dat
```

## Sharing files

_Warming up_. Let's do a quick tour through dat CLI [_features_](dat).
To do this, we are going to share some content, change it and then sync them. Also, we will see how can we get specific content.

### dat share

Dat comes with a [share](dat#sharing-data) command which can be used to share entire directories.

### dat sync

The ogher side of the story is download. To do this we are going to use the [clone](dat#downloading-data) feature along with a _dat link_.

## Exercise

We will make groups of 2 people (at least) :smiley_cat: :smile_cat:.

Along with this readme file you will find a directory called `/cool_cats` with some _high value_ content to share :laughing:.

### 1- Sharing

One of the people (let's say **A member**) in the group will be in charge of sharing our directory called `/cool_cats`.

### 2 - Cloning

The other buddy (the **B member**) will be cloning the dat using the dat link.

### 3 - Creating new content

Now A, will create a new file inside our shared directory called: `top_secret.md`.

Some sample content:

```
# TOP SECRET

> This file will be destroyed in 5 seconds.

Also it is being distributed. :cool:
```

### 4 - Getting updates

To getting new updates we can run the [pull](dat#updating-downloaded-archives) command.

### 5 - What happens if A updates the file?

:wink: sync

### Extra

1. What if we share our dat link with a new buddy and they only want to get the `top_secret.md` file?

### Tip

1. We can combine the _sparse_ option with the special file  [`.datdownload`](dat#selecting-files).

