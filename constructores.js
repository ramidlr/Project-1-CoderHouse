//CREAMOS PRIMER CONSTRUCTOR: USUARIO
class Usuario {
    constructor(
        nombre,
        apellido,
        edad,
        dni,
        fechaNacimiento,
        pais) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.fechaNacimiento = fechaNacimiento;
        this.pais = pais;
    }
}

const usuario1 = new Usuario(
    "Ramiro",
    "del Rio",
    30,
    36169523,
    29051991,
    "España");
const usuario2 = new Usuario(
    "Joaquin",
    "Diaz",
    52,
    28050093,
    30041969,
    "Uruguay");

arrayUsuarios.push(usuario1);
arrayUsuarios.push(usuario2);



//CREAMOS SEGUNDO OBJETO CONSTRUCTOR: SERVICIO
class Servicio {
    constructor(
        id,
        especialidad,
        nombreProfesional,
        apellidoProfesional,
        precioServicio,
        diasDisponibles,
        horarioDisponible,
        mail,
        telefono,
        cantidad) {
        this.id = parseInt(id);
        this.especialidad = especialidad;
        this.nombreProfesional = nombreProfesional;
        this.apellidoProfesional = apellidoProfesional;
        this.precioServicio = parseFloat(precioServicio);
        this.diasDisponibles = diasDisponibles;
        this.horarioDisponible = horarioDisponible;
        this.mail = mail;
        this.telefono = telefono;
        this.disponible = true;
        this.cantidad = parseInt(cantidad);
    }
    precioFinal() {
        return this.precioServicio * 1.21;
        //La funcion precioFinal() suma IVA
    }
    agregarCantidad(valor) {
        // this.cantidad = this.cantidad + valor;
        this.cantidad += valor;
    }
    subtotal() {
        return this.cantidad * (this.precioFinal());
    }
}


const servicio1 = new Servicio(
    1,
    'Peluquero',
    'Juan Jose',
    'Gonzalez',
    3000,
    'Lunes a Jueves',
    '09.00-15.00',
    'juanjosegonzalez@gmail.com',
    47392204,
    1);
const servicio2 = new Servicio(
    2,
    'Manicura',
    'Juana',
    'Urrich',
    3100,
    'Lunes a Jueves',
    '09.00-15.00',
    'juanjosegonzalez@gmail.com',
    47392204,
    1);
const servicio3 = new Servicio(
    3,
    'Pedicura',
    'Manuela',
    'Sanchez',
    2000,
    'Martes a Jueves',
    '09.00-18.00',
    'manuelasanchez@gmail.com',
    47548393,
    1);
const servicio4 = new Servicio(
    4,
    'Estilista',
    'Juan',
    'Olivera',
    1100,
    'Lunes a Domingo',
    '10.00-18.00',
    'juanolivera@gmail.com',
    48922671,
    1);
const servicio5 = new Servicio(
    5,
    'Podologa',
    'Josefina',
    'Alberdi',
    4200,
    'Lunes a Jueves',
    '11.00-20.00',
    'jalberdi@gmail.com',
    48874362,
    1);
const servicio6 = new Servicio(
    6,
    'Cosmetologa',
    'Mia',
    'Bustamante',
    5000,
    'Jueves a Sabado',
    '12.00-21.00',
    'miabustamante@gmail.com',
    47548393,
    1);

arrayServicios.push(servicio1, servicio2, servicio3, servicio4, servicio5, servicio6);