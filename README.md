# minor-BrowserTechnologies 

## Breek het web
[Presentatie](/Breek%20het%20Web/Custom%20Fonts.pdf)

## Fork je Funda

* De app werkt nu niet omdat er geen data binnen wordt gehaald. De API-Request wordt
gedaan op basis van Javascript. Wat hier een oplossing voor kan zijn is een .json bestand als
fallback gebruiken. Zodat hij op fixed data gaat draaien. Dan nog kom je nog op het probleem,
dat deze data ook via javascript in je html gerenderd wordt. Maar dit levert alvast een Fallback,
Wanneer het opvragen van de API eventueel door een browser geblocked wordt. Het is toch een aparte request.

* Het blijft verstandig om de gebruikers meldingen te geven wanneer iets niet werkt door de JavaScript.
Natuurlijk wordt er bijna nooit JavaScript in zijn geheel uitgezet, dus een <noscipt></noscript> tag 
heeft daarom weinig effect. Probeer dit op te lossen met if(){}else{} statements. Wanneer een request
null of undefined is. Geef de gebruiker een melding waarin ze zien dat dit onderdeel niet werkt.
Dit is natuurlijk een tijdelijke oplossing. Het is de bedoeling dat ze zonder dat deel JavaScript evengoed
nog een deel van de site kunnen gebruiken.

* Door je verschillende sections alleen via JavaScipt op hidden te zetten, i.p.v. dit in de HTML al aan
de sections mee te geven. Kan je zonder javascript evengoed alle pagina's bekijken. Ze staan alleen in een
rij onder elkaar.
Met JavaScript:
![Met javascript](screenshots/metjs.jpg)
Zonder JavaScript:
![Zonder JavaScript](sreenshots/zonderjs/jpg)
Hier zie je dat bij de laatste foto, de results section ook direct al wordt laten zien, alle sections zijn op deze manier 
berijkbaar