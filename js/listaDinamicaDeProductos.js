
/*
                    <div class="item">
                        <img src="bellotas.png" alt="">
                        <p class="descripcionItem">descripcion</p>
                        <p class="precio">precio</p>
                        <p class="material">material</p>
                    </div>
*/
async function iniciar(){
    console.log("anda");
    aros = document.getElementById("ContenedorDeAros");
    collares = document.getElementById("ContenedorDeCollares");

    const csvAros = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQLucR9gteMQ1DZGvGekwEJTIopfRYCd53wVvEQE-elcOe9X4UmBj9xx4L6Fe_em716nADQ0He1pC4L/pub?output=csv")
    .then((res) => res.text());
    const listaDeAros = csvAros
        .split("\n")
        .slice(1)
        .map((row) =>{
            const[descripcion,material,price,image,a] = row.split(",");
            return{descripcion,material,price: Number(price),image,a};
        })

    const csvCollares = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRAeCd_NaQoHo4-x_kQVPiePfnYI0hSz1okAYO3fZPRxthpumeuYFd8nbGPHkyiapvS9UnsFrdRtjpf/pub?output=csv")
    .then((res) => res.text());
    const listaDeCollares = csvCollares
        .split("\n")
        .slice(1)
        .map((row) =>{
            const[descripcion,material,price,image,a] = row.split(",");
            return{descripcion,material,price: Number(price),image,a};
        })

    agregarItemsDeTipo(listaDeAros,aros)
    agregarItemsDeTipo(listaDeCollares,collares)
    
}
function agregarItemsDeTipo(lista,tipo){
    lista.forEach(product => {
        const item = document.createElement("div");
        item.className = "item";

        const imagen = document.createElement("img");
        imagen.setAttribute("src",product.image);

        const descripcion = document.createElement("p");
        descripcion.className = "descripcionItem";
        descripcion.textContent = product.descripcion;

        const material = document.createElement("p");
        material.className = "material"
        material.textContent = "material: " + product.material;
        
        const precio = document.createElement("p");
        precio.className = "precio"
        precio.textContent = "$" + product.price;


        item.appendChild(imagen);
        item.appendChild(descripcion);
        item.appendChild(precio);
        item.appendChild(material);

        tipo.appendChild(item);
        // if(product.tipo != "collar"){
        //     collares.appendChild(item);
        // }        
    });
}