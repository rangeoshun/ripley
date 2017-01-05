# Ripley, just another material ripple effect plugin

## Demo

[JSFiddle](https://jsfiddle.net/rangeoshun/mkpu6g99/)

## Usage

Include Ripley in your HTML.

```html
<script src="ripley.min.js"></script>
```

It will collect all elements with class `ripley` on `DOMContentLoaded` event.

```html
<button class="ripley">My ripley button</button>
```

Alternatively you can do this manually on a single element. This will recieve `ripley` class.

```html
<button id="ripleyWannabe">My ripley wannabe button</button>
<script src="ripley.min.js"></script>
<script>
    ripley.add(document.getElementById('ripleyWannabe'));
</script>
```

Or multiple elements. These will recieve `ripley` class.

```html
<button>My ripley wannabe button</button>
<button>And his mate</button>
<script src="ripley.min.js"></script>
<script>
    document.querySelectorAll('button').forEach((element) => ripley.add(element));
</script>
```

## Colors

Currently Ripley uses the elements calculated `color` property, with an alpha of `0.2`;

## Building

After checkout run the following command, which will launch webpack.

```bash
$ npm run build
```

## Notes

 - The element will recieve the class `ripley` which will cause it to have `position: relative` to allow the effect match the size of the element.
 - IE and Edge browsers are not supported yet.
