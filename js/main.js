const images = [
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];


/**********************************
 * Inizializzazione della pagina
**********************************/

//Globali
let currentSlide = 1;

//Costruiamo la prima slide
document.getElementById("activeImgWrapper").innerHTML = `<img id="activeSlide" class="img-fluid"></img>`;
cambiaSlide(1);

//Costruire le thumbnails
let thumbnailsHTML = "";

for (let i = 0; i < images.length; i++) {
    const element = images[i];
    thumbnailsHTML += `<img class="img-fluid thumb" src="${images[i].image}" alt="${images[i].title}"></img>`;
}

// Esempio alternativo per chi volesse usare forEach
// images.forEach(function(element, i) {
//     thumbnailsHTML += `<img class="img-fluid thumb" src="${images[i].image}" alt="${images[i].title}"></img>`;
// });

document.getElementById("thumbsWrapper").innerHTML = thumbnailsHTML;

//Crea event handlers per le thumb
const thumbnailsElem = document.getElementsByClassName("thumb");
for (let i = 0; i < thumbnailsElem.length; i++) {
    const thumb = thumbnailsElem[i];
    thumb.addEventListener("click", function() {
        cambiaSlide(i+1);
    });
}

//Crea l'event handler per il pulsante previous
document.getElementById("prevSlide").addEventListener("click", prevSlide);

//Crea l'event handler per il pulsante next
document.getElementById("nextSlide").addEventListener("click", nextSlide);

//Autoplay
let autoPlayDirection = "normal";
let autoPlayTimer = setInterval(nextSlide, 1*1000);

document.getElementById("playPauseBtn").addEventListener("click", gestisciTimer);

document.getElementById("invertiBtn").addEventListener("click", invertiSlide);

/**********************************
 * Funzioni
**********************************/
//Cambia l'ordine delle slide dell'autoplay
function invertiSlide() {

    //Stoppiamo l'interval in ogni caso
    clearInterval(autoPlayTimer);

    //Se stiamo andando "avanti", invertiamo
    if(autoPlayDirection=="normal") {

        autoPlayTimer = setInterval(prevSlide, 1*1000);
        autoPlayDirection = "inverse";

    //Se stiamo andando alla rovescia, torniamo in "normal"
    } else if(autoPlayDirection=="inverse") {

        autoPlayTimer = setInterval(nextSlide, 1*1000);
        autoPlayDirection = "normal";
    }
}

//Quando richiamata, controlla se il timer è attivo e di conseguenza lo stoppa o riavvia
function gestisciTimer() {
    if(autoPlayTimer == null) {
        //Se il timer è stato settato a null, vogliamo ri-attivare il timer
        autoPlayTimer = setInterval(nextSlide, 1*1000);

    } else {
        //Quando stoppiamo l'autoplay, disattiviamo il timer (clearInterval)
        //Impostiamo la variabile a null, così da poter controllare in secondo momento se siamo "in play"
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}

//Fa avanzare alla prossima slide (controllando che non siamo già sull'ultima)
function nextSlide() {
    if(currentSlide < images.length) {
        cambiaSlide( currentSlide+1 );
    } else {
        cambiaSlide( 1 );
    }
}

//Fa tornare alla slide precedente (controllando che non siamo già sulla prima)
function prevSlide() {
    if(currentSlide > 1) {
        cambiaSlide( currentSlide-1 );
    } else {
        cambiaSlide( images.length );
    }
}

//Imposta una specifica slide
function cambiaSlide(toSlide) {

    //se esiste, cambia slide
    if(toSlide >= 1 && toSlide <= images.length) {

        currentSlide = toSlide;
        const currentObj = images[toSlide-1];
        document.getElementById("activeSlide").src = currentObj.image;
        document.querySelector("#slideText h2").innerText = currentObj.title;
        document.querySelector("#slideText h3").innerText = currentObj.text;

    } else {
        console.error("Questa slide non esiste amico!");
    }

}