# Display Flex

## What is display:flex and how to use it?
### What?
Display flex is a way to create some sort of raster in your site. You can make
rows and columns. Display flex is based on percentages and sizes compared on other
elements.

### How?
You can save variables in your CSS in the following way:
```
:root {
  --main-bg-color: brown;
}
```
By using `:root` the variables will be available everywhere. The prefix used to be var- but it's
changed to --. If you want to call the variable in a element later on. You can do this like this:
```
.three {
  color: white;
  background-color: var(--main-bg-color);
  margin: 10px;
  width: 75px;
}
```
If you want the color to change, you only have to do this in the `:root`. (source 1)

## Compatibility
CSS Variables are newly added. This is a feature where lots of developers have been waiting for.
Before this feature developers often used sass, because they supported variables and nesting. The
variables problem is solved with this feature. With this you can write your own CSS instead of letting
a preprocessor write it for you. You have a 100% overview of the real CSS code and be sure u understand
everything you wrote and more important, that other developers can understand it when needed.
The compatibility is with %69.62 of the browsers. What we have to do is think of a way to make this work
for the other %30.38, without having to go back to the Repeating Cody CSS used to have. (source 2)

## Poor Browser Fixes
If you want to fix this problem you can do multiple things. Below the `background: var(--main-bg-color);`
you can place a `background: brown;`. This way it will render the second rule when the browser doesn't
recognize the first rule. Only this way you still have to change every color code when it's decided that the
color has to change. You can also change this in the following way:
HTML:

```
<article class="primary-bg-color">
	<h1 class="primary-color">Article Title</h1>
	<p>Subtext for the first article. This may have an other color style then the even articles</p>
</article>
<article class="secondary-bg-color">
	<h1 class="secondary-color">Article Title</h1>
	<p>Subtext for the second article. This has another color then the odd articles</p>
</article>

```
CSS:
```
@supports(--primary-color: #0c4f59){
	:root {
		--primary-color: #0c4f59;
		--secondary-color: #2ba9bc;
		--primary-bg-color: #b3d7dc;
		--secondary-bg-color: #0c4f59;
	}
	article:nth-child(odd) {
		color: white;
		background: var(--primary-bg-color);
	}
		article:nth-child(odd) h1 {				
			color: var(--primary-color);
		}
	article:nth-child(even) {
		color: white;
		background: var(--secondary-bg-color);			
	}
		article:nth-child(even) h1 {				
			color: var(--secondary-color);
		}
}
.primary-bg-color {
	background: #b3d7dc;
}
.secondary-bg-color {
	background: #0c4f59;			
}
.primary-color{				
	color: #0c4f59;
}
.secondary-color {				
	color: #2ba9bc;
}
article {
	color: white;
}
```
With the `@supports` you can check if the browser knows the `--primary-color`, if so, the code inside will be
executed. When the browser doesn't know this, it will fall back to the code below. By using classes. U can create
sort like variables. Each class will get their color code. By adding the classes the right way in your HTML. This
will be rendered in the same way as the variables will. It does take a lot of classes to use and add, but when the
colors have to be changed you only have to do this twice per color. Which could make your life a lot easier when
your working on a big site.

## Sources
1. [Developer Mozilla CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)
2. [CanIUse.com #CSS-variables](http://caniuse.com/#feat=css-variables)
