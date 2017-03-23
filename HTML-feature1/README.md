# Dialog Tag

## Compatibility
The Dialog tag doesn't have a very high compatibility. This means it can only be used in browsers that do support it.
And so it will be used as a extra feature, for the rich browsers. But is has to be functional and well working
in the other browsers. This because the poor browsers are the majority. (Source 1)

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
* To fix ...

## Sources
1. [CanIUse.com #Dialog](http://caniuse.com/#search=dialog)
