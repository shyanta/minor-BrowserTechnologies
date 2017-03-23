# Dialog Tag

## What is the Dialog tag and how to use it?
### What?
The dialog Tag is a tag that can be used in combination with a little bit of JavaScript.
This can be used as a Modal. This is a element that can be opened in your screen.
People use this element to put extra information in, or maybe a login screen, pretty much
anything. A modal can also be used in combination with a lightbox. So it becomes a overlay
on the website.

### How?
First you have to create the HTML, which ain't that hard. Simple put it in a `<dialog` and
it can be used. After that you have to create a few JS lines, to make the interaction work.
HTML:
```
<button id="loginDialog">Log hier in</button>
	<dialog id="login">
		<form action="/" method="post">
			<label for="field-email">Email</label>
			<input type="email" id="field-email" name="field-email" autocomplete="email" required autofocus>
			<label for="field-password">Password</label>
			<input type="password" id="field-password" name="field-password" required>
			<input type="checkbox" id="field-stay-logged-in" name="field-stay-logged-in" value="stay-logged-in">
			<label for="field-stay-logged-in">Stay logged in</label>
			<a href="/">Forgot password</a>
			<button type="submit">Login</button>
		</form>
		<button id="close">Close</button>
	</dialog>
```
Outside the `<dialog>` you have to create a `<button>` which will be used to open the modal.
Inside the `<dialog>` there has to be a `<button>` which will be used to close the modal.
JS:
```
	var openBtn = document.getElementById('loginDialog');
	var closeBtn = document.getElementById('close');
	var dialog = document.getElementById('login');
		// Update button opens a modal dialog
		openBtn.addEventListener('click', function() {
			dialog.showModal();				
		});
		// Form cancel button closes the dialog box
		closeBtn.addEventListener('click', function() {
			dialog.close();
		});
	}
```
The `.showModal()` will give a 'open' attribute to the dialog
When the dialog doesn't have the 'open' attribute, it will get a styling with `display: none;`.
When the 'open' attribute is added, this styling will be deleted, which makes the dialog visbible.

The `.close()` will delete the 'open' attribute, which will add the `display: none;` again. (source 1)

## Compatibility
The Dialog Tag can be used in all browsers. But the Dialog tag is used in combination with the
`.showModal()` function. And this function isn't supported in a lot of browsers. When the function
isn't supported, the 'open' attribute won't be added. Without the 'open' attribute, the functionality
of the dialog is gone. We have to write a bit of code to create a solution for this problem.(Source 2)

## Encountered Problems
* Because the login form inside the <dialog> tag is style with `display: flex;`
The standard styling a <dialog> tag adds with the JavaScript functions, won't work.
The given `display: flex;` overwrites the `display: none;` that is given to the `dialog:not([open]);`
I solved this problem like this:
```dialog#login:not([open]) {
	display: none;
}```
In this way I can overwrite the `display: flex;` that was the problem before.
This also fixes a part of the poor browsers. Because the poor browsers aren't compatible
with the <dialog> tag. They also won't add the `display: none;` style. And in this way, it 
will be shown

## Poor Browser Fixes
In order to fix the modal, we have to write a if/else statement which checks if the `.showModal()`
is supported in the browser. If it isn't supported, we have to open and close the dialog by classes.
It's a simple style of `display: none;` that we have to add, just like the original function does. We
only have to write it ourselves this time. (source 3)

The HTML can be exactly the same. It is the JavaScript that we have to edit.
JS:
```
var openBtn = document.getElementById('loginDialog');
var closeBtn = document.getElementById('close');
var dialog = document.getElementById('login');

if (typeof HTMLDialogElement === 'function') {
	console.log("Does support Dialog");
	// Update button opens a modal dialog
	openBtn.addEventListener('click', function() {
		dialog.showModal();				
	});

	// Form cancel button closes the dialog box
	closeBtn.addEventListener('click', function() {
		dialog.close();
	});
} else {
	console.log("Doesn't support Dialog");
	// Update button opens a modal dialog
	openBtn.addEventListener('click', function() {
		dialog.classList.add("open");	
	});

	// Form cancel button closes the dialog box
	closeBtn.addEventListener('click', function() {
		dialog.classList.remove("open");
	});
}
```
This function checks if HTMLDialogElement is a function, if it is, it will use the original way
for the dialog tag. Which includes the `.showModal()` and `.close()` functions. If not, the
class `.open` will be added to the Dialog. This will be used with the following CSS.
CSS:
```
dialog#login:not([open]).open {
			display: flex;
		}
```
The reason to still add the `:not([open])` is because in this way, you don't have the risk
that the CSS rule above won't interfere. Because I used `display: flex;` in my styling, I added
this, if you don't use this, just enter `display: block;` (or one of the other options)

## Sources
1. [Developer Mozzila Dialog](https://developer.mozilla.org/nl/docs/Web/HTML/Element/dialog)
2. [CanIUse.com #Dialog](http://caniuse.com/#search=dialog)
3. [Stackoverflow](http://stackoverflow.com/questions/31845494/how-to-detect-if-browser-supports-dialog)
