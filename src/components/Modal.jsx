import { useEffect, useState } from 'react';
import { Mensaje } from './Mensaje';

import CerarBtn from '../img/cerrar.svg';

export const Modal = ({
	setModal,
	animarModal,
	setAnimarModal,
	guardarGasto,
	gastoEditar,
}) => {
	const [mensaje, setMensaje] = useState('');
	const [nombreGasto, setNombreGasto] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [categoria, setCategoria] = useState('');

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setNombreGasto(gastoEditar.nombreGasto);
			setCantidad(gastoEditar.cantidad);
			setCategoria(gastoEditar.categoria);
		}
	}, []);

	const valorGasto = (e) => setNombreGasto(e.target.value);
	const valorCantidad = (e) => setCantidad(Number(e.target.value));
	const valorCategoria = (e) => setCategoria(e.target.value);

	const ocultarModal = () => {
		setAnimarModal(false);

		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([nombreGasto, cantidad, categoria].includes('')) {
			setMensaje('Todos los campos son obligatorios');

			setTimeout(() => {
				setMensaje('');
			}, 2000);

			return;
		}
		guardarGasto({ nombreGasto, cantidad, categoria });
	};

	return (
		<div className='modal'>
			<div className='cerrar-modal'>
				<img src={CerarBtn} alt='Cerrar modal' onClick={ocultarModal} />
			</div>

			<form
				onSubmit={handleSubmit}
				className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
			>
				<legend>Nuevo Gasto</legend>
				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

				<div className='campo'>
					<label htmlFor='nombre'>Nombre Gasto</label>

					<input
						id='nombre'
						type='text'
						placeholder='Ej. Despensa'
						value={nombreGasto}
						onChange={valorGasto}
					/>
				</div>

				<div className='campo'>
					<label htmlFor='cantidad'>Cantidad</label>

					<input
						id='cantidad'
						type='number'
						placeholder='Ej. 300'
						value={cantidad}
						onChange={valorCantidad}
					/>
				</div>

				<div className='campo'>
					<label htmlFor='categoria'>Categoría</label>

					<select id='categoria' value={categoria} onChange={valorCategoria}>
						<option value='' disabled selected>
							-- Seleccione --
						</option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='casa'>Casa</option>
						<option value='gastos'>Gastos Varios</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Salud</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>

				<input type='submit' value='Añadir Gasto' />
			</form>
		</div>
	);
};
