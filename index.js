//INDEX



// FUNCION QUE SE EJECUTA CUANDO SE CARGA EL DOM
$(document).ready(function () {
    if ("carrito" in localStorage) {
        const arrayServicios = JSON.parse(localStorage.getItem("carrito"));
        for (const Servicio of arrayServicios) {
            carrito.push(new Servicio(
                Servicio.id,
                Servicio.especialidad,
                Servicio.nombreProfesional,
                Servicio.apellidoProfesional,
                Servicio.precioServicio,
                Servicio.diasDisponibles,
                Servicio.horarioDisponible,
                Servicio.mail,
                Servicio.telefono));
        }
        carritoUI(carrito);
    }
    $(".dropdown-menu").click(function (e) {
        e.stopPropagation();
    });



    // CARGA ASINCRONICA DE INFORMACION DE PRODUCTOS DE ORIGEN LOCAL (data/servicios.json)
    $.get("data/servicios.json", function (datos, estado) {
        console.log(datos);
        console.log(estado);
        if (estado == "success") {
            for (const Servicio of arrayServicios) {
                arrayServicios.push(new Servicio(
                    Servicio.id,
                    Servicio.especialidad,
                    Servicio.nombreProfesional,
                    Servicio.apellidoProfesional,
                    Servicio.precioServicio,
                    Servicio.diasDisponibles,
                    Servicio.horarioDisponible,
                    Servicio.mail,
                    Servicio.telefono));
            }
        }
        console.log(arrayServicios);

        // GENERAR INTERFAZ DE SERVICIOS CON UNA FUNCION
        serviciosUI(arrayServicios, $('.boxServicios'));
    });

});



//DOM: AGREGAMOS al HEADER: SEARCH BAR y TITULOS con jQuery:
$("#header").prepend(`
    <div id="searchbardiv">      
        <section>
            <form id="searchbar">
            <input type="search" id="search" name="search">
            <input type="submit" id="submitSearch" name="submit" value="BUSCAR">
            </form>
        </section></div>
    <div id="headerdiv">
        <h1>BEAUTYLIVE™</h1>
	    <h2>Contrata a los mejores <i>BeautyPros</i>,<br>Reserva tu cita!</h3>
	    <hr>
</div>`
);



//SEARCHBAR: AGREGAMOS EVENTO SUBMIT AL SEARCHBAR 
$("#searchbar").submit(function (e) {
  e.preventDefault();
  let hijos = $(e.target).children();
  let inputValue = hijos[0].value;

//SEARCHBAR-FUNCIONALIDAD--> BUSCAR SERVICIO POR ESPECIALIDAD/RUBRO.
  let servicioIngresado = arrayServicios.filter(Servicio => Servicio.especialidad === inputValue);

  if (servicioIngresado !== "" && servicioIngresado.length > 0) {
    for (const Servicio of servicioIngresado) {
      $(".boxServiciosDos").append(`<div class="containerFullCard">
      <div class="cardContent">
      <div class="cardText">
      <h4>${Servicio.especialidad}</h4><hr>
      <p>Nombre: ${Servicio.nombreProfesional}</p>
      <p>Apellido: ${Servicio.apellidoProfesional}</p>
      <p>Disponible: ${Servicio.diasDisponibles}</p>
      <p>A las: ${Servicio.horarioDisponible}</p>
      <p>Mail: ${Servicio.mail}</p>
      <p>Telefono: ${Servicio.telefono}</p>
      <p>El precio final es de: $ ${Servicio.precioFinal()}</p>
      <button class="btnComprar">RESERVAR</button>
      </div>`);
    }
  }
  else {
    $("#resultadoBusqueda").append(`<h5>No se encontraron resultados para su búsqueda</h5>`)
  }
  //STORAGE 
  const guardarLocalBusqueda = (clave, valor) => { localStorage.setItem(clave, valor) };
  //Almacenamos array 
  guardarLocalBusqueda("listaBusquedaServicios", JSON.stringify(servicioIngresado));
});



//DOM: AGREGAMOS FORMULARIO
$("#formulariodiv").append(`
		<form id="formulario">
			<div><input type="text" id="usernameinput" placeholder="Nombre de Usuario" required></div>
			<div><input type="email" id="inputemail" placeholder="Correo Electronico" required></div>
			<div><input type="password" class="form-control" id="passwordinput" placeholder="Ingresa tu contraseña" required></div>
			<div><input type="text" id="nombreinput" placeholder="Nombre y Apellido" required></div>
			<div><input type="date" id="fechaNacimiento" placeholder="Fecha de Nacimiento"></div>
			<div><input type="checkbox" class="form-check-input" id="boxrecordarme" <small>Recuerdame</small></div>
		  <button id="submit" type="submit" class="btn btn-primary">Enviar</button>
	  </form>`);

//FORMULARIO: AGREGAMOS ANIMACION TOGGLE AL BOTON REGISTRATE AQUI --> muestra form completo.
$(".mostrarForm").click(() => {
  $("#formulario").slideToggle("fast");
});

//FORMULARIO: INCORPORAMOS EVENTO FORMULARIO ENVIADO
let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();
  $("#formulariodiv").submit(function (e) {
    console.log("Formulario OK");
  })
};

//FORMULARIO: TESTEAMOS AJAX CON JQUERY en el SUBMIT DEL FORMULARIO
const URLGET = "https://jsonplaceholder.typicode.com/posts";
const infoPost = { nombre: "Guardado =) ajaxTest" };

$("#submit").click(() => {
  console.log('post')
  $.post(URLGET, infoPost, function (respuesta, estado) {
    console.log(respuesta)
    if (estado === "success") {
      console.log("success");
      $("#formulariodiv").append(`<div>
            Guardado:${respuesta.nombre}</div>`)
    }
  })
})



//DOM: USAMOS JQUERY PARA MOSTRAR ARRAY SERVICIOS en DOM.
for (const Servicio of arrayServicios) {
  $(".boxServicios").append(`<div class="containerFullCard">
        <div class="cardContent">
        <div class="cardText">
        <h4>${Servicio.especialidad}</h4><hr>
        <p>${Servicio.nombreProfesional}</p>
        <p>${Servicio.apellidoProfesional}</p>
        <p>Disponible: ${Servicio.diasDisponibles}</p>
        <p>${Servicio.horarioDisponible}</p>
        <p>${Servicio.mail}</p>
        <p>Tel: ${Servicio.telefono}</p>
        <p>$ ${Servicio.precioFinal()}</p>
        <button class="btnComprar">RESERVAR</button>
        </div>`);
}

//STORAGE 
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
//Almacenamos array completo
guardarLocal("listaServicios", JSON.stringify(arrayServicios));



//SELECT: GENERAR OPCIONES PARA FILTRAR POR CATEGORIA
selectUI(arrayServicios, "#filtroCategorias");

//SELECT: DEFINIR EVENTOS SOBRE EL SELECT GENERADO
$('#filtroCategorias').change(function (e) {
    // obtenemos el nuevo valor del select
    const value = this.value;

    $('.boxServicios').fadeOut(600, function () {
        // el filtro se realiza una vez oculto el contenedor
        if (value == 'TODOS') {
            serviciosUI(arrayServicios, '.boxServicios');
        } else {
            const filtrados = arrayServicios.filter(Servicio => Servicio.especialidad == value);
            serviciosUI(filtrados, '.boxServicios');
        }
        // mostrar una vez generados los productos
        $(".boxServicios").fadeIn();
    })
});



//FUNCIONALIDAD: ORDENAR POR PRECIO
let sortedPrecio = [];
sortedPrecio = arrayServicios.map(element => element);
sortedPrecio = arrayServicios;
sortedPrecio.sort(function (a, b) {
  return a.precioServicio - b.precioServicio
});


for (const Servicio of sortedPrecio) {
  $(".boxServiciosTres").append(`<div class="containerFullCard">
    <div class="cardContent">
    <div class="cardText">
    <h4>${Servicio.especialidad}</h4><hr>
    <p>${Servicio.nombreProfesional}</p>
    <p>${Servicio.apellidoProfesional}</p>
    <p>Disponible: ${Servicio.diasDisponibles}</p>
    <p>${Servicio.horarioDisponible}</p>
    <p>${Servicio.mail}</p>
    <p>Tel: ${Servicio.telefono}</p>
    <p>$ ${Servicio.precioFinal()}</p>
    <button class="btnComprar">RESERVAR</button>
    </div>
    </div>
    </div>`);
}

//ANIMACION TOGGLE PARA MOSTRAR FILTRADOS POR PRECIO
$(".porPrecio").click(() => {
  $(".boxServiciosTres").slideToggle("fast");
})

//STORAGE 
const guardarLocalPorPrecio = (clave, valor) => { localStorage.setItem(clave, valor) };
//Almacenamos array completo
guardarLocalPorPrecio("resultadoPorPrecio", JSON.stringify(sortedPrecio));