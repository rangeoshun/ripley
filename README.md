# Ripley, just another material ripple effect plugin

## Usage

Include Ripley in your HTML.

```html
<script src="ripley.min.js"></script>
```

It will collect all elements with class `ripley` on `DOMConentLoaded` event.

```html
<button class="ripley">My ripley button</button>
```

Alternatively you can do this manually on a single element.

```html
<button id="ripleyWannabe">My ripley wannabe button</button>
<script src="ripley.min.js">
    ripley.add(document.getElementById('ripleyWannabe'));
</script>
```

Or multiple elements.
```html
<button>My ripley wannabe button</button>
<button>And his mate</button>
<script src="ripley.min.js">
    document.querySelectorAll('button').forEach((element) => ripley.add(element));
</script>
```