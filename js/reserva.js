/*
* Error en los datos de la reserva 1 o en el resultado esperado para precioFinal.
* En la consigna dice que los descuentos por grupo deben aplicarse del siguiente modo:

    Descuento por grupos grandes: si la cantidad de personas de la reserva está entre 4 y 6 personas, se agrega un 5% de descuento. Para grupos entre de 7 y 8 personas un 10% de descuento y para grupos de más de 8 personas un 15% de descuento.

* Los datos de la reserva 1 son:

  var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")

* a esta reserva le corresponde un descuento por grupo de 10%, y no de 15%, porque se encuentra dentro de la segunda condición mayores de 7 y menores de 8.
* El precio final que figura en la guia, para controlar es de 2310, pero a ese valor sólo se llega si se aplica un descuento del 15%, lo cual no sería correcto, de acuerdo a la consigna.
*
*/

var Reserva = function(fecha, cantidad, precio, codigoDescuento) {
  this.fecha = fecha;
  this.dia = this.fecha.getDay();
  this.horario = this.fecha.getHours();
  this.cantPersonas = cantidad;
  this.precioPersona = precio;
  this.codigo = codigoDescuento;
  this.precioBase = this.cantPersonas * this.precioPersona;
  this.adicionalesPorHorario = function() {
    if (this.horario == 13 || this.horario == 14 || this.horario == 20 || this.horario == 21) {
      return calcularPorcentaje(5, this.precioBase);
    } else {
      return 0;
    }
  }
  this.adicionalesPorDia = function() {
    if (this.dia == 5 || this.dia == 6 || this.dia == 7) {
      return calcularPorcentaje(10, this.precioBase);
    } else {
      return 0;
    }
  }
  this.descuentosPorGrupo = function() {
    if (this.cantPersonas >= 4 && this.cantPersonas <= 6) {
      return calcularPorcentaje(5, this.precioBase);
    } else if (this.cantPersonas >= 7 && this.cantPersonas <= 8) {
      return calcularPorcentaje(10, this.precioBase);
    } else if (this.cantPersonas > 8) {
      return calcularPorcentaje(15, this.precioBase);
    } else {
      return 0;
    }
  }
  this.descuentosPorCodigo = function() {
    if (this.codigo == 'DES15') {
      return calcularPorcentaje(15, this.precioBase);
    } else if (this.codigo == 'DES200') {
      return 200;
    } else if (this.codigo == 'DES1') {
      return this.precioPersona;
    } else {
      return 0;
    }
  }
  this.precioFinal = function() {
    return this.precioBase + this.adicionalesPorHorario() + this.adicionalesPorDia() - this.descuentosPorGrupo() - this.descuentosPorCodigo();
  }
}
var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
var reserva3 = new Reserva (new Date(2019, 3, 21, 12, 30), 9, 500, 'DES15');
var reserva4 = new Reserva (new Date(2019, 8, 14, 21, 00), 4, 300, '');

function calcularPorcentaje(descuento, precioBase) {
  return Math.round((descuento * precioBase) / 100);
}
