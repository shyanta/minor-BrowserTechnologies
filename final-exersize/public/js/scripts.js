var saveButton = document.querySelector('button');

var text = document.querySelector('p').innerHTML;
var shirtColor = document.querySelector('img').getAttribute('alt');
var style = document.querySelector('p').getAttribute('style');
var savedSection = document.querySelector('.saved-items');
var savedNoItems = document.querySelector('.saved-items p');
	savedSection.setAttribute('hidden', true);
	saveButton.setAttribute('hidden', true);

if (typeof window.localStorage !== "undefined"){
	savedSection.removeAttribute('hidden');
	saveButton.removeAttribute('hidden');
	saveButton.addEventListener('click', function(){

		localStorage.setItem('style', style);
		localStorage.setItem('text', text);
		localStorage.setItem('color', shirtColor);
	})

	if (window.localStorage.length == 0) {
		savedNoItems.innerHTML = "You don't have any saved items yet";
	} else {
		// saveButton.eventListener('')
	}
}
