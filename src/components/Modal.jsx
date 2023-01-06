import { useEffect, useState } from 'react';
import { Mensaje } from './Mensaje';

import CerarBtn from '../img/cerrar.svg';

export const Modal = ({
	setModal,
	animarModal,
	setAnimarModal,
	guardarGasto,
	gastoEditar,
	setGastoEditar,
}) => {
	const [mensaje, setMensaje] = useState('');
	const [nombreGasto, setNombreGasto] = useState('');
	const [cantidad, setCantidad] = useState('');
	const [categoria, setCategoria] = useState('');
	const [fecha, setFecha] = useState('');
	const [id, setId] = useState('');

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setNombreGasto(gastoEditar.nombreGasto);
			setCantidad(gastoEditar.cantidad);
			setCategoria(gastoEditar.categoria);
			setFecha(gastoEditar.fecha);
			setId(gastoEditar.id);
		}
	}, []);

	const valorGasto = (e) => setNombreGasto(e.target.value);
	const valorCantidad = (e) => setCantidad(Number(e.target.value));
	const valorCategoria = (e) => setCategoria(e.target.value);

	const ocultarModal = () => {
		setAnimarModal(false);
		setGastoEditar({});
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
		guardarGasto({ nombreGasto, cantidad, categoria, fecha, id });
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
				<legend>{gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
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

				<input
					type='submit'
					value={gastoEditar.nombreGasto ? 'Guardar Cambios' : 'Añadir Gasto'}
				/>
			</form>
		</div>
	);
};
