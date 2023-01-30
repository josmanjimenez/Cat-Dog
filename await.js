const URL = 'https://api.thedogapi.com/v1/images/search?limit=10';
const URL1 =' https://api.thecatapi.com/v1/images/search?limit=10';
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


const caruoselImg1=document.querySelector('#img-caruosel1');
const caruoselImg2=document.querySelector('#img-caruosel2');
const caruoselImg3=document.querySelector('#img-caruosel3');
const caruoselImg4=document.querySelector('#img-caruosel4');
const dogsCtn = document.querySelector('.container-dogs');
const catsCtn = document.querySelector('.container-cats');
const err = document.getElementById('error');
const sec = document.getElementById('favoritesd');
const sec1 = document.getElementById('favoritesc');



async function fetch1 (){
   
        const res = await fetch(URL);
        const data = await res.json();
        if(res.status!==200){
            err.innerHTML='hubo un error'+ res.status;

        }
        else{
        console.log(data);
        let view=`${data.map(dog=>` <div class="card border border-dark p-2">
        <img class="perro border-bottom border-dark " src=${dog.url}  alt="imagen de  un perro" >
        <button class="mt-2 bt2 save_dog"  onclick="saveDog('${dog.id}')" >agregar a favoritos </button>
        </div>`).join("")}`;

        dogsCtn.innerHTML=view;
       
        }
  

}
async function fetch2 (){
    
    const res = await fetch(URL1);
    const data = await res.json();
    if (res.status!==200){
     err.innerHTML='hubo un error'+ res.status;
    }
    else {
        console.log('cat',data)
        let view=`${data.map(cat=>` <div class="card border border-dark p-2">
        <img class="gato border-bottom border-dark " src=${cat.url}  alt="imagen de  un perro" >
        <button class="mt-2 bt2 save_cat" onclick="saveCat('${cat.id}')" >agregar a favoritos </button>
        </div>`).join("")}`;

        catsCtn.innerHTML=view;
      
        
    }

}


async function favoritesDog(){
   
    const res = await fetch(URL_KEY);
    const data = await res.json();
    if (res.status!== 200){
        err.innerHTML=`hubo un error ${res.status} ${data.message}`;
    }
    else {
       console.log('faviritos',data);
        data.forEach(item => {
           
            const div = document.createElement('div');
            div.classList.add("card","border","border-dark","p-2")
             const img = document.createElement('img'); 
             img.classList.add('gato', 'border-bottom', 'border-dark');
             img.setAttribute('alt','imagen perro');
             const btn = document.createElement('button');
             btn.classList.add("mt-2", "bt2")
             const btnText = document.createTextNode('Sacar el dog de favoritos');
             img.src=item.image.url;
             btn.onclick=()=> deleteDog(item.id);
             btn.appendChild(btnText);
             div.appendChild(img);
             div.appendChild(btn);
             sec.appendChild(div); 
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
      

        data.forEach(item => {
           
            const div = document.createElement('div');
            div.classList.add("card","border","border-dark","p-2")
             const img = document.createElement('img'); 
             img.classList.add('gato', 'border-bottom', 'border-dark');
             img.setAttribute('alt','imagen perro');
             const btn = document.createElement('button');
             btn.classList.add("mt-2", "bt2")
             const btnText = document.createTextNode('Sacar el gato de favoritos');
             img.src=item.image.url;
             btn.onclick=()=> deleteCat(item.id);
             btn.appendChild(btnText);
             div.appendChild(img);
             div.appendChild(btn);
             sec1.appendChild(div); 
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





