import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/utils/contexts/authContexts';

import useForm from '@/utils/hooks/useForm';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Layout from '@/components/Layout';

export default function Signin() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const { fields, errors, validate, handleChange } = useForm(
		{
			email: '',
			password: '',
		},
		{
			email: { required: true, type: 'email' },
			password: { required: true },
		},
	);

	const handleSubmit = () => {
		if (validate() && authContext) {
			authContext.signin(fields.email, fields.password);
		}
	};

	return (
		<Layout className="gap-4">
			<div className="flex flex-col gap-4 p-6 w-2xl bg-white rounded-2xl">
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
					ui='text'
					className="text-left cursor-pointer text-green-blue hover:text-delft-blue"
					action={() => {
						navigate('/forgot-password');
					}}
				>
					Forgot password?
				</Button>

				<Button
					ui='button'
					className="bg-default-100 hover:bg-default-200 hover:text-white h-16"
					action={handleSubmit}
				>
					Login
				</Button>

				<div className='inline-flex gap-1 items-center justify-center'>
					<span className='font-normal text-sm'>Don't have an account?</span>
					<Button
						ui='text'
						className="text-sm text-green-blue hover:text-delft-blue"
						action={() => {
							navigate('/signup');
						}}
					>
						Register
					</Button>
				</div>
			</div>
		</Layout>
	);
}
