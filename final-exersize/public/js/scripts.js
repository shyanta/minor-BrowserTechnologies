var saveButton1 = document.querySelector('.button-first');
var saveButton2 = document.querySelector('.button-second');
var saveButton3 = document.querySelector('.button-third');

var shirtText = document.querySelector('p').innerHTML;
var shirtColor = document.querySelector('img').getAttribute('alt');
var shirtStyle = document.querySelector('p').getAttribute('style');
var savedSection = document.querySelector('.saved-items');
var savedSectionList = document.querySelector('.saved-shirts');
var savedFirst = document.querySelector('.shirtOne');
var savedSecond = document.querySelector('.shirtOne');
var savedThird = document.querySelector('.shirtThree');
var savedNoItems = document.querySelector('.saved-items p');
	savedSection.setAttribute('hidden', true);
	saveButton1.setAttribute('hidden', true);
	saveButton2.setAttribute('hidden', true);
	saveButton3.setAttribute('hidden', true);

if (typeof window.localStorage !== "undefined"){
	savedSection.removeAttribute('hidden');
	saveButton1.removeAttribute('hidden');
	saveButton2.removeAttribute('hidden');
	saveButton3.removeAttribute('hidden');

	saveButton1.addEventListener('click', function(){
		var shirtObject1 = {
				'color': shirtColor,
				'style': shirtStyle,
				'text': shirtText
			}
		console.log(shirtObject1);
		localStorage.setItem('shirt1', JSON.stringify(shirtObject1))
	})
	saveButton2.addEventListener('click', function(){
		var shirtObject2 = {
				'color': shirtColor,
				'style': shirtStyle,
				'text': shirtText
			}
		console.log(shirtObject2);
		localStorage.setItem('shirt2', JSON.stringify(shirtObject2))
	})
	saveButton3.addEventListener('click', function(){
		var shirtObject3 = {
				'color': shirtColor,
				'style': shirtStyle,
				'text': shirtText
			}
		console.log(shirtObject3);
		localStorage.setItem('shirt3', JSON.stringify(shirtObject3))
	})

	var shirtOneData = JSON.parse(localStorage.getItem('shirt1'));
	var shirtTwoData = JSON.parse(localStorage.getItem('shirt2'));
	var shirtThreeData = JSON.parse(localStorage.getItem('shirt3'));
	
	if (shirtOneData === null && shirtTwoData === null && shirtThreeData === null) {
		savedNoItems.innerHTML = "You don't have any saved items yet";
		savedSectionList.setAttribute('hidden', true);
	} else {
		savedSectionList.removeAttribute('hidden');

		if (shirtOneData !== null){
			savedFirst.innerHTML = '<p style="'+shirtOneData.style+'">'+shirtOneData.text
			+'<img src="img/shirt-'+shirtOneData.color+'.jpg" alt="'+shirtOneData.color+'" title="'+shirtOneData.color+'"/></p>'
		}else if (shirtTwoData !== null){
			savedSecond.innerHTML = '<p style="'+shirtTwoData.style+'">'+shirtTwoData.text
			+'<img src="img/shirt-'+shirtTwoData.color+'.jpg" alt="'+shirtTwoData.color+'" title="'+shirtTwoData.color+'"/></p>'
		}else if (shirtThreeData !== null){
			savedThird.innerHTML = '<p style="'+shirtThreeData.style+'">'+shirtThreeData.text
			+'<img src="img/shirt-'+shirtThreeData.color+'.jpg" alt="'+shirtThreeData.color+'" title="'+shirtThreeData.color+'"/></p>'
		}
	}
}
