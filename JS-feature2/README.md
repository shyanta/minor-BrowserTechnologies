# AddEventListener

## What is the AddEventListener tag and how to use it?
### What?
The addEventListener function is used in JavaScript when you want to connect
a function to some events like 'click', or 'submit' or something.
So when a user clicks on a button. With eventlistener you can execute some code.
Such as showing and hiding an area or something.

### How?
First you have to create the buttons that will activated the Eventlistener.
After that create the elements that should be toggled inside the Eventlistener.
HTML:
```html
<button id="click">Click for some action</button>
<button id="no-action">No more action</button>
<h1>SOME ACTION</h1>
```
First you have to save some elments in variables. Such as the button(s) that
triggers the toggle. And the parts that should be toggled.
Then you have to connect the button to an Eventlistener. And the parts can be
toggled with a class which will be activated by clicking the button.
In this case I have two buttons. One that shows the `<h1>` and one that hides it.
JS:
```js
var btn = document.getElementById("click");
var noActionBtn = document.getElementById('no-action');
var output = document.getElementsByTagName('h1')[0];
output.setAttribute('class', 'hidden');

btn.addEventListener('click', function(){
	output.removeAttribute('class', 'hidden');
});
noActionBtn.addEventListener('click', function(){
	output.setAttribute('class', 'hidden');
});
```
First I'm hiding the part that has to be toggled with JavaScript. I'm doing
this with JavaScript so when something doesn't work in the script, the `<h1>` will
always be shown. So without JavaScipt the user will see al the content on the site.
<br/>
On the 'click' event, the function after it will be executed.
In this function I am adding a class, that will hide the element. This class is
remove with the click on the first button. So the `<h1>` will be visible. And with
the other button I'm adding the class again, to hide the `<h1>`.(Source 1)

## Compatibility
AddEventListener(); is supported in almost every version of every browser. Except
for IE8 or lower. To give the users with those browsers the same experience as
users with newer browsers. This function can be replaced with an older
function, that will work in IE8 or lower(Source 2)

## Poor Browser Fixes
The fix is pretty simple. We have to use an if-statement to check if
`AddEventListener()` is supported. And if not we have to use the
`attachEvent()` as an Eventlistener. It works almost the same, expect for the 'click' that will change to 'onclick'.(source 3)

The HTML can be exactly the same. It is the JavaScript that we have to edit.
JS:
```js
var btn = document.getElementById("click");
var noActionBtn = document.getElementById('no-action');
var output = document.getElementsByTagName('h1')[0];
output.setAttribute('class', 'hidden');

if (document.addEventListener){
	btn.addEventListener('click', function(){
		output.removeAttribute('class', 'hidden');
	});
	noActionBtn.addEventListener('click', function(){
		output.setAttribute('class', 'hidden');
	});
} else {
	btn.attachEvent('onclick', function(){
		output.removeAttribute('class', 'hidden');
	});
	noActionBtn.attachEvent('onclick', function(){
		output.setAttribute('class', 'hidden');
	});
}
```
The if-statement checks if `document.addEventListener` is supported. If not, the statement returns false and so it will execute the code in `else`.
CSS:
```css
h1.hidden {
	display: none;
}
```
The class `.hidden` is what is being toggled in the JavaScript code above.

## Sources
1. [Developer Mozzila AddEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
2. [CanIUse.com AddEventListener](http://caniuse.com/#feat=addeventlistener)
3.  [Stackoverflow](https://stackoverflow.com/questions/39272718/how-do-i-detect-document-addeventlistener-support-in-javascript)
