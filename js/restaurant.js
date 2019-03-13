var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(function(horario) {
      return horario !== horarioReservado;
    })
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promediar(sumar(this.calificaciones), this.calificaciones);
    }
}
//se cambio el nombre de las funciones a crear promedio() y sumatoria() ya que daba error porque las variables se llaman igual.
function sumar(calificaciones) {
  var sumatoria = 0;
  for (var i = 0; i < calificaciones.length; i++) {
      sumatoria += calificaciones[i];
  }
  return sumatoria;
}
function promediar(suma, calificaciones) {
  var promedio = suma / calificaciones.length;
  return Math.round(promedio * 10) / 10;
}
