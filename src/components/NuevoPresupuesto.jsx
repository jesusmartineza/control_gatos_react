import { useState } from 'react';
import { Mensaje } from './Mensaje';

export const NuevoPresupuesto = ({
	presupuesto,
	setPresupuesto,
	setIsValidPresupuesto,
}) => {
	const [mensaje, setMensaje] = useState('');

	const handlePresupuesto = (e) => {
		e.preventDefault();
		if (!presupuesto || presupuesto < 0) {
			setMensaje('NO es un presupuesto valido');

			return;
		}

		setMensaje('');
		setIsValidPresupuesto(true);
	};

	const cantidad = (e) => {
		setPresupuesto(Number(e.target.value));
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra'>
			<form className='formulario' onSubmit={handlePresupuesto}>
				<div className='campo'>
					<label>Definir Presupuesto</label>

					<input
						type='number'
						className='nuevo-presupuesto'
						placeholder='Añade tu presupuesto'
						value={presupuesto}
						onChange={cantidad}
					/>
				</div>

				<input type='submit' value='Añadir' />

				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
			</form>
		</div>
	);
};
