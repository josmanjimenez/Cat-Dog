const URL = 'https://api.thedogapi.com/v1/images/search';
const URL1 =' https://api.thecatapi.com/v1/images/search';
 const boton = document.querySelector('button');
 boton.addEventListener('click', newImages);
const img = document.querySelector('.perro');
const img1 = document.querySelector('.gato');




function newImage (){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
       
        img.src=data[0].url;
    
        
    });
}
   
function newImage2 (){
    fetch(URL1)
    .then(res => res.json())
    .then(data => {
        img1.src=data[0].url;
        
    });
}

function newImages (){
   newImage();
   newImage2();
    
}
newImage();
newImage2();