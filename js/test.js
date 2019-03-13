//iniciar mocha y chai.
var expect = chai.expect;

describe('Testeo de la funcion reservarHorario(horario)', function() {
  var restaurant;
  var horariosLength;
  beforeEach(function() {
    restaurant = listadoDeRestaurantes[0];
    horariosLength = restaurant.horarios.length;
  })
  it('Debe eliminar horario del restaurant', function() {
    restaurant.reservarHorario('13:00');
    expect(restaurant.horarios).to.eql(['15:30', '18:00']);
  })
  it('El arreglo se debe mantener igual si el horario no existe', function() {
    restaurant.reservarHorario('8:00');
    expect(restaurant.horarios).to.have.lengthOf(horariosLength);
  })
  it('El arreglo debe mantenerse igual cuando no se pasa un horario como parámetro', function() {
    restaurant.reservarHorario();
    expect(restaurant.horarios).to.have.lengthOf(horariosLength);
  })
});

describe('Testeo de la funcion obtenerPuntuacion()', function() {
  var restaurant;
  beforeEach(function() {
    restaurant = listadoDeRestaurantes[0];
  })
  it ('Las calificaciones se calculan bien', function() {
    restaurant.calificaciones = [1, 1, 1, 1, 1];
    expect(restaurant.obtenerPuntuacion()).to.equal(1);
  })
  it ('Si la calificación es 0 debe devolver 0', function() {
    restaurant.calificaciones = [];
    expect(restaurant.obtenerPuntuacion()).to.equal(0);
  })
})

describe('Testeo de la función calificar', function() {
  var restaurant;
  beforeEach(function() {
    restaurant = listadoDeRestaurantes[1];
  })
  it ('Verificar agregar una calificacion', function() {
    restaurant.calificar(7)
    expect(restaurant.calificaciones).to.eql([7, 7, 3, 9, 7, 7])
  })
  it('Si no se le pasa ninguna nueva calificacion, no debe modificar el array', function() {
    restaurant.calificar();
    expect(restaurant.calificaciones).to.eql([7, 7, 3, 9, 7, 7])
  })
  it('Si se pasa una string, no debe modificar el array', function() {
    restaurant.calificar('muy bueno!!');
    expect(restaurant.calificaciones).to.eql([7, 7, 3, 9, 7, 7])
  })
  it('Si se pasa un número menor que 0, no debe modificar el array', function() {
    restaurant.calificar(-3);
    expect(restaurant.calificaciones).to.eql([7, 7, 3, 9, 7, 7])
  })
  it('Si se pasa un número mayor que 10, no debe modificar el array', function() {
    restaurant.calificar(13);
    expect(restaurant.calificaciones).to.eql([7, 7, 3, 9, 7, 7])
  })
})

describe('Testeo de la funcion buscarRestaurante', function() {
  it('Pasar un id a la función, debe retornar el restaurante correcto', function() {
    var id = 3;
    var restaurantCorrecto = listadoDeRestaurantes[id - 1].id;
    var restaurantBuscando = listado.buscarRestaurante(id);
    expect(restaurantBuscando.id).to.equal(restaurantCorrecto)
  })
  it ('Si no encuentra ningun restaurant con esa id, debe devolver mensaje', function() {
    var id = 25;
    expect(listado.buscarRestaurante(id)).to.equal('No se ha encontrado ningún restaurant');
  })
})

describe('Testeo funcion obtenerRestaurantes', function() {
  it('Si le paso un valor null a cualquiera de los parámetros, no debe devolver un restaurant', function() {
    var restaurantes = listado.obtenerRestaurantes('13:00');
    expect(restaurantes.length).to.equal(0);
  })
  it('Si le paso los datos correctos debe devolver el restaurante correcto', function() {
    var restaurantes = listado.obtenerRestaurantes('Pasta', 'Roma', '13:00');
    expect(restaurantes[0].nombre).to.equal('Osteria Da Fortunata');
  })
})

describe('Testeo del precio base y precio final', function() {
  beforeEach(function() {
    var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    var reserva3 = new Reserva (new Date(2019, 3, 21, 12, 30), 9, 500, 'DES15');
    var reserva4 = new Reserva (new Date(2019, 8, 14, 21, 00), 4, 300, '');
  })
  it('Verificar los adicionales por dia', function() {
    expect(reserva1.adicionalesPorDia()).to.be.equal(calcularPorcentaje(10, reserva1.precioBase));
    expect(reserva2.adicionalesPorDia()).to.be.equal(0);
    expect(reserva3.adicionalesPorDia()).to.be.equal(0);
    expect(reserva4.adicionalesPorDia()).to.be.equal(calcularPorcentaje(10, reserva4.precioBase));
  })
  it('Verificar los adicionales por horario', function() {
    expect(reserva1.adicionalesPorHorario()).to.be.equal(0);
    expect(reserva2.adicionalesPorHorario()).to.be.equal(0);
    expect(reserva3.adicionalesPorHorario()).to.be.equal(0);
    expect(reserva4.adicionalesPorHorario()).to.be.equal(60);
  })
  it('Verificar los descuentos por código', function() {
    expect(reserva1.descuentosPorCodigo()).to.be.equal(reserva1.precioPersona);
    expect(reserva2.descuentosPorCodigo()).to.be.equal(200);
    expect(reserva3.descuentosPorCodigo()).to.be.equal(calcularPorcentaje(15, reserva3.precioBase));
    expect(reserva4.descuentosPorCodigo()).to.be.equal(0);
  })
  it('Vefificar los descuentos por grupo', function() {
    expect(reserva1.descuentosPorGrupo()).to.be.equal(calcularPorcentaje(10, reserva1.precioBase));
    expect(reserva2.descuentosPorGrupo()).to.be.equal(0);
    expect(reserva3.descuentosPorGrupo()).to.be.equal(calcularPorcentaje(15, reserva3.precioBase));
    expect(reserva4. descuentosPorGrupo()).to.be.equal(calcularPorcentaje(5, reserva4.precioBase));
  })
  it('Testeo de precio base', function() {
    expect(reserva1.precioBase).to.be.equal(2800);
    expect(reserva2.precioBase).to.be.equal(300);
    expect(reserva3.precioBase).to.be.equal(500 * 9);
    expect(reserva4.precioBase).to.be.equal(300 * 4);
  })
  it('Testeo de precio final', function() {
    var reserva3Adicionales = 0;
    var reserva3Descuentos = calcularPorcentaje(15, reserva3.precioBase) + calcularPorcentaje(15, reserva3.precioBase);
    var precioFinal3 = (500 * 9) + reserva3Adicionales - reserva3Descuentos;

    var reserva4Adicionales = calcularPorcentaje(10, reserva4.precioBase) + 60;
    var reserva4Descuentos = calcularPorcentaje(5, reserva4.precioBase);
    var precioFinal4 = (300 * 4) + reserva4Adicionales - reserva4Descuentos;

    //// FIXME: VER COMENTARIO EN PÁGINA RESERVAS, ESTÁ MAL LA CONSIGNNA DEL EJERCICIO.
    expect(reserva1.precioFinal()).to.be.equal(2450);

    expect(reserva2.precioFinal()).to.be.equal(100);
    expect(reserva3.precioFinal()).to.be.equal(precioFinal3);
    expect(reserva4.precioFinal()).to.be.equal(precioFinal4);
  })
})
