var saveButton = document.querySelector('button');

var text = document.querySelector('p').innerHTML;
var shirtColor = document.querySelector('img').getAttribute('alt');
var style = document.querySelector('p').getAttribute('style');
var savedSection = document.querySelector('.saved-items');
var savedNoItems = document.querySelector('.saved-items p');
var num;

if (typeof window.localStorage !== "undefined"){
	savedSection.removeAttribute('hidden');
	saveButton.removeAttribute('hidden');
	saveButton.addEventListener('click', function(){

		localStorage.setItem('style'+num, style);
		localStorage.setItem('text'+num, text);
		localStorage.setItem('color'+num, shirtColor);
		num ++;
		console.log(num);
	})

	if (window.localStorage.length == 0) {
		savedNoItems.innerHTML = "You don't have any saved items yet";
	} else {
		// saveButton.eventListener('')
	}
}
