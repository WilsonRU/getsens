import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/utils/contexts/authContexts';

import useForm from '@/utils/hooks/useForm';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Layout from '@/components/Layout';

export default function Signup() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const { fields, errors, validate, handleChange } = useForm(
		{
			name: '',
			email: '',
			password: '',
		},
		{
			name: { required: true },
			email: { required: true, type: 'email' },
			password: { required: true },
		},
	);

	const handleSubmit = () => {
		if (validate() && authContext) {
			authContext.signup(fields.email, fields.password, fields.name);
		}
	};

	return (
		<Layout className="gap-4">
			<span className="text-white text-4xl font-bold">Criar Conta</span>

			<div className="flex flex-col gap-4 p-6 w-2xl bg-white rounded-2xl">
				<Input
					type="text"
					name="name"
					placeholder="Nome do Usuário"
					label="Nome"
					value={fields.name}
					error={errors.name}
					onChange={handleChange}
					className="h-16"
				/>

				<Input
					type="text"
					name="email"
					placeholder="usuario@getsens.com"
					label="Email"
					value={fields.email}
					error={errors.email}
					onChange={handleChange}
					className="h-16"
				/>

				<Input
					type="password"
					name="password"
					placeholder="********"
					label="Senha"
					value={fields.password}
					error={errors.password}
					onChange={handleChange}
					className="h-16"
				/>

				<Button
					ui='button'
					className="bg-default-100 hover:bg-default-200 hover:text-white h-16"
					action={handleSubmit}
				>
					Cadastrar
				</Button>

				<Button
					ui='text'
					className="text-center font-bold cursor-pointer hover:text-zinc-900"
					action={() => {
						navigate('/');
					}}
				>
					Voltar
				</Button>
			</div>
		</Layout>
	);
}
