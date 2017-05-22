# Display Flex

## What is display:flex and how to use it?
### What?
Display flex is a way to create some sort of raster in your site. You can make
rows and columns. Display flex is based on percentages and sizes compared on other
elements. Like when you have 2 elements in a row, but you want the second element to be twice as big as the first.

### How?
The parent element gets a `display:flex;`. The childeren elements get stuff like
`flex-basis: 50%;`.
```css
body {
	display: flex;
	flex-wrap: wrap;
	height: 100vh;
	margin: 0;
}
section {
	background-color: lightgreen;
	flex-basis: 50%;
	text-align: center;
	padding: 0;
}
section:nth-of-type(2) {
	background-color: lightblue;
}
section:last-child {
	background: hotpink;
	flex-basis: 100%;
}
```
Flex-wrap is used to tell the parent, the children can be placed over more rows, in
stead of pushing them all in 1 row. The standard flex-direction is set to row. If
you want it to be in columns, you'll have to overwrite the standards.
Flex-basis is used to tell how big you want each element to be.(source 1)

## Compatibility
A lot of browsers support `display:flex` except for older versions that IE9. Also a lot of browsers only have partial support. When a browsers doesn't support
`display:flex` the whole website layout can be hurt.(source 2)

## Poor Browser Fixes
To fix this you'll only have to make some changes in CSS. This problem can be fixed
with the use of the `@supports`. Now don't worry, if a browser doesn't support the
'@support', the code inside will not be executed. So make sure to use `@supports` and
NOT the `@supports not`. Because when it isn't recognized it will exucute the code
outside of this. Which then will contain the styling that isn't supported.
CSS:
```css
body {
	margin: 0;
}
section {
	width: 50%;
	float: left;
	background-color: lightgreen;
	text-align: center;
	padding: 50px 0;
}
section:nth-of-type(2){
	background-color: lightblue;
}
section:last-child {
	width: 100%;
	background-color: hotpink;
}
@supports(display:flex){
	body {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: 100vh;
		margin: 0;
	}
	section {
		background-color: lightgreen;
		flex-basis: 50%;
		text-align: center;
		padding: 0;
	}
	section:nth-of-type(2) {
		background-color: lightblue;
	}
	section:last-child {
		background: hotpink;
		flex-basis: 100%;
	}
}
```
Outside of the `@supports` you will create a styling based on floats. So this code
will be executed always. When the `@supports` is true, the code in here will overwrite
the code above.

## Sources
1. [CSS Tricks - Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
2. [CanIUse.com #Flexbox](http://caniuse.com/#feat=flexbox)
