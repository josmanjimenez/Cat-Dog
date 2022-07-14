const URL = 'https://api.thedogapi.com/v1/images/search';
const URL1 =' https://api.thecatapi.com/v1/images/search';
//headers autorization/
const URL1f =' https://api.thecatapi.com/v1/favourites';

//////query parameter ////
const URL_KEY = 'https://api.thedogapi.com/v1/favourites?&api_key=9e10fd34-8a0a-40c8-95de-b3ae3a732464';
const URL1_KEY =' https://api.thecatapi.com/v1/favourites?&api_key=e45fedc2-c33f-415f-9056-1e4b4e027b39';
const URL_KEY_DELETE = (id)=>`https://api.thedogapi.com/v1/favourites/${id}?&api_key=9e10fd34-8a0a-40c8-95de-b3ae3a732464`;
const URL1_KEY_DELETE =(id)=>`https://api.thecatapi.com/v1/favourites/${id}?&api_key=e45fedc2-c33f-415f-9056-1e4b4e027b39`;
const URL1_UP = 'https://api.thecatapi.com/v1/images/upload';

/////axios////////
const axn = axios.create ({
    baseURL: 'https://api.thedogapi.com/v1' });
    axn.defaults.headers.common['X-API-KEY'] = '9e10fd34-8a0a-40c8-95de-b3ae3a732464';



 const boton = document.querySelector('button'); 
 const btnDog= document.getElementById('save_dog');
 const btnCat = document.getElementById('save_cat');
 boton.addEventListener('click', newImages);
const img = document.querySelector('.perro');
const img1 = document.querySelector('.gato');
const err = document.getElementById('error');
const sec = document.getElementById('favoritesd');
const sec1 = document.getElementById('favoritesc');
const catTitle = document.querySelector('favoritesc-title')


async function fetch1 (){
   
        const res = await fetch(URL);
        const data = await res.json();
        if(res.status!==200){
            err.innerHTML='hubo un error'+ res.status;

        }
        else{
        img.src=data[0].url;
       
        btnDog.onclick= ()=> saveDog(data[0].id);
        
        }
  

}
async function fetch2 (){
    
    const res = await fetch(URL1);
    const data = await res.json();
    if (res.status!==200){
     err.innerHTML='hubo un error'+ res.status;
    }
    else {
        img1.src=data[0].url;
        
        btnCat.onclick= ()=> saveCat(data[0].id);
        
    }

}


async function favoritesDog(){
   
    const res = await fetch(URL_KEY);
    const data = await res.json();
    if (res.status!== 200){
        err.innerHTML=`hubo un error ${res.status} ${data.message}`;
    }
    else {
       console.log(data);
        data.forEach(item => {
           
            const article = document.createElement('article');
             const img = document.createElement('img');
             const btn = document.createElement('button');
             const btnText = document.createTextNode('Sacar el dog de favoritos');
             img.src=item.image.url;
             btn.onclick=()=> deleteDog(item.id);
             btn.appendChild(btnText);
             article.appendChild(img);
             article.appendChild(btn);
             sec.appendChild(article); 
         });
    }


}
async function favoritesCat (){
   ////header autorization////
    const res = await fetch(URL1f,{headers:{
        "X-API-KEY" :'e45fedc2-c33f-415f-9056-1e4b4e027b39'}});
    const data = await res.json();
    if (res.status!== 200){
        err.innerHTML=`hubo un error ${res.status} ${data.message}`;
    }
    else {
        console.log(data);
        catTitle.innerHTML='';
        catTitle.innerHTML='favorites cat';

        data.forEach(item => {
           
           const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar el cat de favoritos');
            img.src=item.image.url;
            btn.onclick=()=> deleteCat(item.id);
            btn.appendChild(btnText);
            article.appendChild(img);
            article.appendChild(btn);
            sec1.appendChild(article); 
        });
        
    }
}

async function saveDog (id){
    // const res = await fetch(URL_KEY,{
    //     method:'POST',
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify({
    //         image_id:id
    //     })
    // }); 
    // const data = await res.json();

    const {data,status} = await axn.post('/favourites',{image_id:id})
    
    if (status!== 200){
        err.innerHTML=`hubo un error ${status} ${data.message}`;
    }
    else {
      console.log (data);
      sec.innerHTML='';
      const h2 = document.createElement('h2');
      const text = document.createTextNode("favorites dog");
      h2.appendChild(text);
      sec.appendChild(h2);
      favoritesDog();
    }
}
async function saveCat (id){
    const res = await fetch(URL1_KEY,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            image_id:id
        })
    }); 
    const data = await res.json();
    
    
    if (res.status!== 200){
        err.innerHTML=`hubo un error ${res.status} ${data.message}`;
    }
    else {
        console.log (data+ "cat guardado")
        sec1.innerHTML='';
      const h2 = document.createElement('h2');
      const text = document.createTextNode("favorites cat");
      h2.appendChild(text);
      sec.appendChild(h2);
      favoritesCat();
}
}
async function deleteDog (id){
    const res = await fetch(URL_KEY_DELETE(id),{
        method:'DELETE'
        
    }); 
    const data = await res.json();
    
    if (res.status!== 200){
        err.innerHTML=`hubo un error ${res.status} ${data.message}`;
    }
    else {
      console.log (data+ 'dog borrado');
      sec.innerHTML='';
      const h2 = document.createElement('h2');
      const text = document.createTextNode("favorites dog");
      h2.appendChild(text);
      sec.appendChild(h2);
      favoritesDog();
    }
}
async function deleteCat (id){
    const res = await fetch(URL1_KEY_DELETE (id),{
        method:'DELETE'
        
    }); 
    const data = await res.json();
    
    if (res.status!== 200){
        err.innerHTML=`hubo un error ${res.status} ${data.message}`;
    }
    else {
      console.log (data + 'cat borrado');
      sec1.innerHTML='';
      
      favoritesCat();
    }
}

 async function upfile1 () {
 const form = document.getElementById ('upload1');
 const formData = new FormData (form);
 console.log (formData.get ('file'));
 const {data,status} = await axn.post('/images/upload');
 
 if(status!==201){
    err.innerHTML=`hubo un error ${status} ${data.message}`;
    }
    else{
    console.log ('dog guardado en api y agregado a favorito');
    console.log(data);
    console.log(data.url);
    saveDog(data.id);
 

    }
 }

 const upfile2 = async ()=> {
    const form = document.getElementById ('upload2');
    const formData =  new FormData (form);
    console.log (formData.get ('file'));
    const res = await fetch (URL1_UP,{
        method:'POST',
        headers:{
           'X-API-KEY':'e45fedc2-c33f-415f-9056-1e4b4e027b39'
        },
        body:formData        

})
    const data = await res.json ();
    
    if (res.status!==201){
        err.innerHTML=`hubo un error ${res.status} ${data.message}`;
    }
    else {
        console.log ('cat guardado en api y agregado a favorito');
        console.log(data);
        console.log(data.url);
        saveCat(data.id);


    }
    }


function newImages (){
    fetch1();
    fetch2();
    
}




fetch1();
fetch2();
favoritesDog ();
favoritesCat();





