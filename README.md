# Ripley, just another material ripple effect plugin

## Demo

https://jsfiddle.net/rangeoshun/mkpu6g99/

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
