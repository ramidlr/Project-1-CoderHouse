//SELECT: FUNCION PARA GENERAR OPCIONES DE UN SELECT
function selectUI(arrayServicios, Servicio) {
    $(Servicio).empty();
    arrayServicios.forEach(Servicio => {
        $("#filtroCategorias").append(`<option value="${Servicio.especialidad}">${Servicio.especialidad}</option>`)
    });
    $("#filtroCategorias").prepend(`<option value="TODOS" selected>TODOS</option>`);
}



//SERVICIOS: FUNCION PARA GENERAR LA INTERFAZ DE SERVICIOS CON JQUERY
function serviciosUI(arrayServicios, id) {
    $(id).empty()
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
      </div>
      <a href="#" id='${Servicio.id}' class="btn btn-primary btn-compra">RESERVAR</a>
      </div>
      </div>`);
    }

    $('.btn-compra').on("click", comprarServicio);
}



//COMPRA: MANEJADOR DE COMPRA DE PRODUCTOS
function comprarServicio(e) {
    //PREVENIR ACTUALIZAR PAGINA AL PRESIONAR ENLACES
    e.preventDefault();

    //PREVENIR LA PROPAGACION DEL EVENTO
    e.stopPropagation();

    //OBTENER ID DEL BOTON PRESIONADO
    const idServicio = e.target.id;

    //OBTENER OBJETO DEL SERVICIO CORRESPONDIENTE AL ID
    const seleccionado = carrito.find(Servicio => Servicio.id == idServicio);

    // SI NO SE ENCONTRO EL ID, BUSCAR EN ARRAY DE SERVICIOS
    if (seleccionado == undefined) {
        carrito.push(arrayServicios.find(Servicio => Servicio.id == idServicio));
    } else {
        // Si se encontro agregar cantidad
        seleccionado.agregarCantidad(1);
    }

    // GUARDAR EN STORAGE
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // GENERAR SALIDA PRODUCTO
    carritoUI(carrito);
}



//CARRITO: FUNCION PARA RENDERIZAR LA INTERFAZ DEL CARRITO
function carritoUI(arrayServicios) {
    // CAMBIAR INTERIOR DEL INDICADOR DE CANTIDAD DE PRODUCTOS;
    $('#carritoCantidad').html(arrayServicios.length);

    // VACIAR EL INTERIOR DEL CARRITO;
    $('#carritoProductos').empty();

    for (const Servicio of arrayServicios) {
        $('#carritoProductos').append(registroCarrito(Servicio));
    }

    // AGREGAR TOTAL
    $("#carritoProductos").append(`<p id="totalCarrito">TOTAL ${totalCarrito(arrayServicios)}</p>`);

    // AGREGAR BOTON CONFIRMAR
    $("#carritoProductos").append(`
    <div id="divConfirmar" 
    class="text-center">
    <button id="btnConfirmar" class="btn btn-success">CONFIRMAR</button>
    </div>`
    );

    // ASOCIAR EVENTOS A LA INTERFAZ GENERADA
    $(".btn-add").click(addCantidad);
    $(".btn-delete").click(eliminarCarrito);
    $(".btn-restar").click(restarCantidad);
    $("#btnConfirmar").click(confirmarCompra);
}



// FUNCION PARA GENERAR LA ESTRUCTURA DEL REGISTRO HTML
function registroCarrito(Servicio) {
    return `<p> ${Servicio.especialidad} <br>
            <span> Precio Unitario: ${Servicio.precioFinal()}</span> <br>
            <span> Precio Total: ${Servicio.subtotal()}</span> <br>
            <button id="${Servicio.id}" class="btn btn-info btn-add">+</button>
            <button id="${Servicio.id}" class="btn btn-warning btn-restar">-</button>
            <button id="${Servicio.id}" class="btn btn-danger btn-delete">Borrar</button>
            </p>`
}



//CARRITO: MANEJADOR PARA ELIMINAR CARRITO
function eliminarCarrito(e) {
    console.log(e.target.id);
    let posicion = carrito.findIndex(Servicio => Servicio.id == e.target.id);
    carrito.splice(posicion, 1);
    console.log(carrito);
    // GENERAR NUEVAMENTE INTERFAZ
    carritoUI(carrito);
    // GUARDAR EN STORAGE EL NUEVO CARRITO
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



//CARRITO: MANEJADOR PARA AGREGAR CANTIDAD 
function addCantidad() {
    let Servicio = carrito.find(Servicio => Servicio.id == this.id);
    Servicio.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = Servicio.cantidad;
    $(this).parent().children()[2].innerHTML = Servicio.subtotal();
    //MODIFICAR TOTAL
    $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
    // GUARDAR EN STORAGE
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



//CARRITO: MANEJADOR PARA RESTAR CANTIDAD
function restarCantidad() {
    let Servicio = carrito.find(Servicio => Servicio.id == this.id);
    if (Servicio.cantidad > 1) {
        Servicio.agregarCantidad(-1);

        let registroUI = $(this).parent().children();
        registroUI[1].innerHTML = Servicio.cantidad;
        registroUI[2].innerHTML = Servicio.subtotal();

        //MODIFICAR TOTAL
        $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);

        //GUARDAR EN STORAGE
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}



//CARRITO: FUNCION PARA OBTENER EL PRECIO TOTAL DEL CARRITO
function totalCarrito(carrito) {
    console.log(carrito);
    let total = 0;
    carrito.forEach(Servicio => total += Servicio.subtotal());
    return total.toFixed(2);
}



//CARRITO: AJAX: FUNCION PARA ENVIAR AL BACKEND LA ORDEN DE PROCESAMIENTO DE COMPRA
function confirmarCompra() {
    // REALIZAMOS LA PETICION POST
    const URLPOST = 'http://jsonplaceholder.typicode.com/posts';
    // INFORMACION A ENVIAR
    const DATA = { arrayServicios: JSON.stringify(carrito), total: totalCarrito(carrito) }
    // PETICION POST CON AJAX
    $.post(URLPOST, DATA, function (respuesta, estado) {
        if (estado == 'success') {
            console.log("success");
            //MOSTRAMOS NOTIFICACION DE CONFIRMACIÓN (CON ANIMACIONES)
            $("#header").prepend(`<div align="left">Reserva Confirmada!</div>`).fadeIn().delay(2000);
            $("#notificaciones").html(`<div><a>RESERVA CONFIRMADA!</a></div>`).fadeIn().delay(2000);
            //VACIAR CARRITO;
            carrito.splice(0, carrito.length);
            //SOBREESCRIBIR ALMACENADO EN STORAGE
            localStorage.setItem("CARRITO", '[]');
            //VACIAR CONTENIDO DEL MENU
            $('#carritoProductos').empty();
            //VOLVER INDICADOR A 0
            $('#carritoCantidad').html(0);
        }
    })
}