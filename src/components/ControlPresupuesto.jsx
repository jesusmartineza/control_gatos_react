import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';

export const ControlPresupuesto = ({
	presupuesto,
	gastos,
	setGastos,
	setPresupuesto,
	setIsValidPresupuesto,
}) => {
	const [porcentaje, setPorcentaje] = useState(0);
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	useEffect(() => {
		const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);

		const totalDisponible = presupuesto - totalGastado;

		//Calcular el porcentaje para la grafica de gastos
		const nuevoPorcentaje = (
			((presupuesto - totalDisponible) / presupuesto) *
			100
		).toFixed(2);

		setDisponible(totalDisponible);
		setGastado(totalGastado);

		setTimeout(() => {
			setPorcentaje(nuevoPorcentaje);
		}, 1000);
	}, [gastos]);

	//Esta funcion nos deja formaterar una cantidad para en vez de verse asi $1000 se vea asi $1,000.00 y sea mas entendible la cantidad
	const formatearCantidad = (cantidad) => {
		return cantidad.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	const handleReset = () => {
		Swal.fire({
			title: '¿Quieres resetear el presupuesto y los gastos?',
			text: 'Si das click en si, ya no se podra revertir!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#0B610B',
			cancelButtonColor: '#8A0808',
			confirmButtonText: 'Si, Resetear',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				setGastos([]);
				setPresupuesto(0);
				setIsValidPresupuesto(false);
				// Swal.fire('Eliminado!', 'Tu presupuesto ha sido reinciado');
			}
		});
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div>
				<CircularProgressbar
					styles={buildStyles({
						pathColor:
							porcentaje < 51
								? '#2EFE2E'
								: porcentaje < 85
								? '#FF4000'
								: '#dc2626',
						trailColor: '#f5f5f5',
						textColor:
							porcentaje < 51
								? '#2EFE2E'
								: porcentaje < 85
								? '#FF4000'
								: '#dc2626',
					})}
					value={porcentaje}
					text={`${porcentaje}% Gastado`}
				/>
			</div>

			<div className='contenido-presupuesto'>
				<button className='reset-app' type='button' onClick={handleReset}>
					Resetear Presupuesto
				</button>

				<p>
					<span>Presupuesto: </span> {formatearCantidad(presupuesto)}
				</p>
				<p className={`${disponible < 0 ? 'negativo' : ''}`}>
					<span>Disponible: </span> {formatearCantidad(disponible)}
				</p>
				<p>
					<span>Gastado: </span> {formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};
