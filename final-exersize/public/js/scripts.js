var saveButton1 = document.getElementById('button-first');
var saveButton2 = document.getElementById('button-second');
var saveButton3 = document.getElementById('button-third');

var shirtText = document.getElementById('shirt-text').innerHTML;
var shirtColor = document.getElementById('img').getAttribute('alt');
var shirtStyle = document.getElementById('shirt-text').getAttribute('style');
var savedSection = document.getElementById('saved-items');
var savedSectionList = document.getElementById('saved-shirts');
var savedFirst = document.getElementById('shirtOne');
var savedSecond = document.getElementById('shirtTwo');
var savedThird = document.getElementById('shirtThree');
var savedNoItems = document.getElementById('no-shirts');
	savedSection.setAttribute('hidden', true);
	saveButton1.setAttribute('hidden', true);
	saveButton2.setAttribute('hidden', true);
	saveButton3.setAttribute('hidden', true);



if (typeof window.localStorage !== "undefined"){
	savedSection.removeAttribute('hidden');
	saveButton1.removeAttribute('hidden');
	saveButton2.removeAttribute('hidden');
	saveButton3.removeAttribute('hidden');

	if(document.addEventListener){
		saveButton1.addEventListener('click', function(){
			var shirtObject1 = {
					'color': shirtColor,
					'style': shirtStyle,
					'text': shirtText
				}
			console.log(shirtObject1);
			localStorage.setItem('shirt1', JSON.stringify(shirtObject1));
			shirtOneFunc(JSON.parse(localStorage.getItem('shirt1')));
		})
		saveButton2.addEventListener('click', function(){
			var shirtObject2 = {
					'color': shirtColor,
					'style': shirtStyle,
					'text': shirtText
				}
			console.log(shirtObject2);
			localStorage.setItem('shirt2', JSON.stringify(shirtObject2));
			shirtTwoFunc(JSON.parse(localStorage.getItem('shirt2')));
		})
		saveButton3.addEventListener('click', function(){
			var shirtObject3 = {
					'color': shirtColor,
					'style': shirtStyle,
					'text': shirtText
				}
			console.log(shirtObject3);
			localStorage.setItem('shirt3', JSON.stringify(shirtObject3));
			shirtThreeFunc(JSON.parse(localStorage.getItem('shirt3')));
		})
	} else {
		saveButton1.attachEvent('onclick', function(){
			var shirtObject1 = {
					'color': shirtColor,
					'style': shirtStyle,
					'text': shirtText
				}
			console.log(shirtObject1);
			localStorage.setItem('shirt1', JSON.stringify(shirtObject1));
			shirtOneFunc(JSON.parse(localStorage.getItem('shirt1')));
		})
		saveButton2.attachEvent('onclick', function(){
			var shirtObject2 = {
					'color': shirtColor,
					'style': shirtStyle,
					'text': shirtText
				}
			console.log(shirtObject2);
			localStorage.setItem('shirt2', JSON.stringify(shirtObject2));
			shirtTwoFunc(JSON.parse(localStorage.getItem('shirt2')));
		})
		saveButton3.attachEvent('onclick', function(){
			var shirtObject3 = {
					'color': shirtColor,
					'style': shirtStyle,
					'text': shirtText
				}
			console.log(shirtObject3);
			localStorage.setItem('shirt3', JSON.stringify(shirtObject3));
			shirtThreeFunc(JSON.parse(localStorage.getItem('shirt3')));
		});
	}
	var shirtOneData = JSON.parse(localStorage.getItem('shirt1'));
	var shirtTwoData = JSON.parse(localStorage.getItem('shirt2'));
	var shirtThreeData = JSON.parse(localStorage.getItem('shirt3'));

	if (shirtOneData === null && shirtTwoData === null && shirtThreeData === null) {
		savedNoItems.innerHTML = "You don't have any saved items yet";
		savedSectionList.setAttribute('hidden', true);
	} else {
		savedSectionList.removeAttribute('hidden');
		// console.log(savedFirst.innerHTML);
		if (savedFirst.innerHTML === ""){

			shirtOneFunc(shirtOneData);
		}
		if (savedSecond.innerHTML === ""){
			shirtTwoFunc(shirtTwoData);
		}
		if (savedThird.innerHTML === ""){
			shirtThreeFunc(shirtThreeData);
		}
	}

	function shirtOneFunc(shirtOneData){
		if (shirtOneData !== null){
			savedFirst.innerHTML = '<p style="'+shirtOneData.style+'">'+shirtOneData.text
			+'</p><img src="img/shirt-'+shirtOneData.color+'.jpg" alt="'+shirtOneData.color+'" title="'+shirtOneData.color+'"/>'
		}
	}
	function shirtTwoFunc(shirtTwoData){
		if (shirtTwoData !== null){
			savedSecond.innerHTML = '<p style="'+shirtTwoData.style+'">'+shirtTwoData.text
			+'</p><img src="img/shirt-'+shirtTwoData.color+'.jpg" alt="'+shirtTwoData.color+'" title="'+shirtTwoData.color+'"/>'
		}
	}
	function shirtThreeFunc(shirtThreeData){
		if (shirtThreeData !== null){
			savedThird.innerHTML = '<p style="'+shirtThreeData.style+'">'+shirtThreeData.text
			+'</p><img src="img/shirt-'+shirtThreeData.color+'.jpg" alt="'+shirtThreeData.color+'" title="'+shirtThreeData.color+'"/>'
		}
	}
} else {
	savedSection.setAttribute('hidden', true);
	saveButton1.setAttribute('hidden', true);
	saveButton2.setAttribute('hidden', true);
	saveButton3.setAttribute('hidden', true);
}
