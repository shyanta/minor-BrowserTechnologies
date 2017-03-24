# Main Tag

## What is the Dialog tag and how to use it?
### What?
The `<main>` is a element that is introduced with HTML5. Main is usually where you place
the content of your website. You start with the `<header>` than you go with the `<main>` and
you end with the `<footer>`.

### How?
The main tag is very simple to use. You can use it like any other element. The most important 
thing is that you don't forget to close it.
```
<header>
	<h1>Here you can place your navigation, logo, imageslider etc.</h1>
</header>
<main>
	<h1>Here you place the content of the site</h1>
</main>
<footer>
	<h1>Here you place yout contact information. Copyrights etc.</h1>
</footer>
```
You can style this element just by calling the main tag like this:
```
main {
	width: 70%;
	margin: 0 15%;
}
```
This will make the main tag a container, so all the content will be wrapped in the center
of the page. (source 1)
## Compatibility
This tag is compatible with a lot of browsers. Except for Internet Explorer.
IE doesn't support the main tag. You can use it to wrap elements in, but when you add styling
to this tag, IE will not render this styling. It's only one browser that isn't compatible, but
even the newest version of IE isn't supporting this. And IE is used a lot in big company's.


## Poor Browser Fixes
You can fix this problem by adding a `display: block;` to the `<main>` styling. IE can render
the styling again. However, IE8 still won't render the styling. Because IE8 doesn't support
none of the HTML5 tags. So the wise choice is to add all of these elements to your site. 
Which is why a little bit of JavaScript is needed. With the following lines of JS, this 
is solved.

```
<script>
	document.createElement('header');
	document.createElement('section');
	document.createElement('main');
	document.createElement('article');
	document.createElement('aside');
	document.createElement('nav');
	document.createElement('footer');
</script>
``` 
(sourse 3)

## Sources
1. [Developer Mozilla Main](https://developer.mozilla.org/nl/docs/Web/HTML/Element/main)
2. [Can I Use #main](http://caniuse.com/#search=main)
3. [HTML5 Tag not working in Internet Explorer](https://weblog.west-wind.com/posts/2015/Jan/12/main-HTML5-Tag-not-working-in-Internet-Explorer-91011)

