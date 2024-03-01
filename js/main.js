let marvel = [];
let dc = [];
let data = [];
let todo = [];
document.addEventListener('DOMContentLoaded', async (e) => {
    data = await loadData2();
    marvel = data[0];
    dc = data[1];
    todo = [...marvel, ...dc];
    crearCard(marvel, cardMarvel, 'marvel');
    crearCard(dc, cardDc, 'dc');

    const buscar = document.querySelector('.buscar');
    buscar.addEventListener('click',obtenerNombre)
    function obtenerNombre(){
        cardsDc.innerHTML = "";
        cardsMarvel.innerHTML = "";
        enca[0].style.display = 'none';
        enca[1].style.display = 'none';
        const input = document.getElementById("buscador");
        const valor = input.value.toLowerCase();
        const resultado = todo.filter((hero) =>
            hero.name.toLowerCase().includes(valor)
        );
        console.log(resultado[0]);
        crearCard(resultado,cardsMarvel);
        input.value = "";
    }
    const up = document.getElementById('up');

    up.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

async function loadData2() {
    let dataMarvel = await fetch('./json/dataMarvel.json').then(response => response.json());
    let dataDC = await fetch('./json/dataDC.json').then(response => response.json());
    return [dataMarvel, dataDC];
}

const enca = document.getElementsByClassName('encabezado');
const cardMarvel = document.querySelector('.cardMarvel');
const cardDc = document.querySelector('.cardDc');
const sectionMarvel = document.getElementById('marvel');
const sectionDC = document.getElementById('dc');

function crearCard(arreglo, padre, franquicia) {
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
        boton.classList.add('boton', 'abrir', franquicia);
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

function detectarClick(event) {
    if (event.target.classList.contains("abrir")) {
        const id = event.target.id;
        if (event.target.classList.contains('marvel')) {
            buscar(id, marvel)
        }
        else if (event.target.classList.contains('dc')) {
            buscar(id, dc)
        }else{
            buscar(id, todo)
        }
    }
}

function buscar(id, franquicia) {
    let hero = franquicia.find((item) => item.id === id);
    mostrarModal(hero);
}

function mostrarModal(hero) {
    imgModal.src = hero.picture;
    tituloModal.textContent = hero.name;
    descripcion.textContent = hero.about;
    fecha.innerHTML = `<strong>Fecha de creacion: </strong> ${hero.fecha_creacion}`
    opacity.style.display = 'block';
    dialog.show();
}

btnCerrar.addEventListener('click', function () {
    dialog.close()
    imgModal.src = "";
    opacity.style.display = 'none';
});

let marvelFilter = document.querySelector('#marvelFilter');
let dcFilter = document.querySelector('#dcFilter');
let allFilter = document.querySelector('#allFilter');
marvelFilter.addEventListener('click', universeFilter);
dcFilter.addEventListener('click', universeFilter);
allFilter.addEventListener('click', universeFilter);

function universeFilter(event) {

    cardsMarvel.innerHTML = "";
    cardsDc.innerHTML = "";
    if (event.target.id === 'marvelFilter') {
        crearCard(marvel, cardMarvel, 'marvel');
        enca[0].style.display = 'flex';
        enca[1].style.display = 'none';
        cardsDc.innerHTML = "";
        sectionMarvel.style.display = 'block';
        sectionDC.style.display = 'none';
    }
    else if (event.target.id === 'dcFilter') {
        crearCard(dc, cardDc, 'dc');
        enca[0].style.display = 'none';
        enca[1].style.display = 'flex';
        cardsMarvel.innerHTML = "";
        sectionMarvel.style.display = 'none';
        sectionDC.style.display = 'block';
    }
    else if (event.target.id === 'allFilter') {
        crearCard(marvel, cardMarvel, 'marvel');
        crearCard(dc, cardDc, 'dc');
        enca[0].style.display = 'flex';
        enca[1].style.display = 'flex';
        sectionDC.style.display = 'block';
        sectionMarvel.style.display = 'block';
    }

}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}