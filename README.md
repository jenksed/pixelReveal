# pixelate-v2 (pixelReveal)
pixelate-v2, also known as pixelReveal, is an enhanced version of the original pixelate.js library. It offers an easy and efficient way to pixelate images on your web pages and provides options to reveal the original images interactively on hover or click.

# Usage
pixelate-v2 (pixelReveal) can be easily integrated into your project. You can use it directly with HTML data attributes or programmatically using JavaScript.

## Using HTML Data Attributes
Simply add the data-pixelate attribute to your <img> tags, like this:

```
<img src="example.jpg" width="300" height="300" data-pixelate>
```

## Using JavaScript
You can also use pixelate-v2 programmatically. Here’s an example using JavaScript:

```
const myImage = document.querySelector('img');
const pixelate = new Pixelate(myImage, { value: 0.5, reveal: true, revealOnClick: false });
```

# Options
pixelate-v2 provides several options to customize the pixelation and reveal effects:

value: A number between 0 and 1 representing the intensity of pixelation. Higher values result in more pixelation.
reveal: A boolean value. If true, hovering over the image will reveal the original, unpixelated version.
revealOnClick: A boolean value. If true, clicking on the image will reveal the original version. If combined with reveal, the image will remain revealed after being clicked.
Using Data Attributes
You can set these options using data attributes in your HTML:

```
<img src="example.jpg" data-pixelate data-value="0.6" data-reveal="true" data-revealOnClick="true">
```

## Using JavaScript
Or set options programmatically when initializing pixelate-v2 using JavaScript:

```
const options = {
    value: 0.6,
    reveal: true,
    revealOnClick: true
};

const myImage = document.querySelector('img');
const pixelate = new Pixelate(myImage, options);
```

# License
pixelate-v2 (pixelReveal) is open-source software released under the MIT license. Feel free to use, modify, and distribute the library in your projects.