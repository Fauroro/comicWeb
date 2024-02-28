let marvel = [];
let dc = [];
let data = [];
document.addEventListener('DOMContentLoaded',async (e) =>{
    data = await loadData2();
    marvel = data[0];
    dc = data[1];
    crearCard(marvel,cardMarvel,'marvel');
    crearCard(dc,cardDc,'dc');
});

async function loadData2(){
    let dataMarvel = await fetch('../json/dataMarvel.json').then(response => response.json()); 
    let dataDC = await fetch('../json/dataDC.json').then(response => response.json()); 
    return [dataMarvel,dataDC];
}

const cardMarvel = document.querySelector('.cardMarvel');
const cardDc = document.querySelector('.cardDc');
const sectionMarvel = document.getElementById('marvel');

// sectionMarvel.style.display = 'none'

function crearCard(arreglo,padre,franquicia){
    arreglo.forEach(item => {
        const card = document.createElement('div');
        const divImage = document.createElement('div');
        const image = document.createElement('img');
        const divName = document.createElement('div');
        const pName = document.createElement('p');
        const boton = document.createElement('button');
    
        card.classList.add('card');
        divImage.classList.add('image');
        image.src = item.squarePic;
        divName.classList.add('name');
        pName.textContent = item.name;
        boton.classList.add('boton','abrir',franquicia);
        boton.id = item.id;
        boton.textContent = 'Ver';
    
        divName.appendChild(pName);
        divName.appendChild(boton);
        divImage.appendChild(image);
        card.appendChild(divImage);
        card.appendChild(divName);
        padre.appendChild(card);
    });
};

const btnAbrir = document.querySelector('.abrir');
const btnCerrar = document.querySelector('.cerrar');
const dialog = document.querySelector('.dialogo');
const opacity = document.querySelector('.opacity')
const cardsMarvel = document.querySelector(".cardMarvel")
const cardsDc = document.querySelector(".cardDc")

const imgModal = dialog.querySelector('.imgModal');
const tituloModal = dialog.querySelector('.tituloModal');
const descripcion = dialog.querySelector('.descripcion');
const fecha = dialog.querySelector('.fecha');

cardsMarvel.addEventListener('click', detectarClick)
cardsDc.addEventListener('click', detectarClick)

function detectarClick(event){
    if (event.target.classList.contains("abrir")){
        const id = event.target.id;
        if (event.target.classList.contains('marvel')) {
            buscar(id,marvel)
        }
        else if (event.target.classList.contains('dc')) {
            buscar(id,dc)
        }
    }
}

function buscar(id,franquicia){
    let hero = franquicia.find((item) => item.id === id);
    mostrarModal(hero);    
}

function mostrarModal(hero){
    imgModal.src = hero.picture;
    tituloModal.textContent = hero.name;
    descripcion.textContent = hero.about;
    fecha.innerHTML = `<strong>Fecha de creacion: </strong> ${hero.fecha_creacion}`
    opacity.style.display = 'block';
    dialog.show();
}

btnCerrar.addEventListener('click', function (){
    dialog.close()
    imgModal.src = "";
    opacity.style.display = 'none';
});


