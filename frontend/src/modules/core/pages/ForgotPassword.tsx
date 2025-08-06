import { AuthContext } from '@/utils/contexts/authContexts';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import useForm from '@/utils/hooks/useForm';
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import Button from '@/components/Button';

export default function ForgotPassword() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const { fields, errors, validate, handleChange } = useForm(
		{
			email: '',
		},
		{
			email: { required: true, type: 'email' },
		},
	);

	const handleSubmit = () => {
		if (validate() && authContext) {
			authContext.forgotPassword(fields.email);
		}
	};

	return (
		<Layout className="gap-4">
			<div className="flex flex-col gap-4 p-6 w-2xl bg-white rounded-2xl">
				<Input
					type="text"
					name="email"
					placeholder="user@getsens.com"
					label="Email"
					value={fields.email}
					error={errors.email}
					onChange={handleChange}
					className="h-16"
				/>

				<Button
					ui='button'
					className="bg-default-100 hover:bg-default-200 hover:text-white h-16"
					action={handleSubmit}
				>
					Reset Password
				</Button>

				<Button
					ui='text'
					className="text-sm hover:text-charcoal"
					action={() => {
						navigate('/');
					}}
				>
					Go Back
				</Button>
			</div>
		</Layout>
	);
}
