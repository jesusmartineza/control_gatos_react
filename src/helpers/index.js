//Generando un ID para cada objeto o paciente

export const generarId = () => {
	const random = Math.random().toString(36).substring(2);
	const fecha = Date.now().toString(36);

	return random + fecha;
};

//Dar formato a una fecha sin uso de una libreria

export const formatearFecha = (fecha) => {
	const nuevaFecha = new Date(fecha);
	const opciones = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	};

	return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
