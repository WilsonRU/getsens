import { type ReactNode, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpClient } from '@/utils/lib/httpClient';
import toast from 'react-hot-toast';

interface AuthProviderProps {
	children: ReactNode;
}

interface Account {
	id: number;
	email: string;
	name: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

interface AuthContextType {
	authenticated: boolean;
	user: Account;
	signin: (email: string, password: string) => void;
	signup: (email: string, password: string, name: string) => void;
	forgotPassword: (email: string) => void;
	logout: () => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const client = new HttpClient();
	const navigate = useNavigate();
	const user = sessionStorage.getItem('account')
		? JSON.parse(sessionStorage.getItem('account') as string)
		: null;

	const signin = async (email: string, password: string) => {
		await client
			.post('core/login', { email, password })
			.then((response) => {
				sessionStorage.setItem('token', response.token);
				sessionStorage.setItem('account', JSON.stringify(response.user));

				navigate('/dashboard');
			})
			.catch(async (err) => {
				const httpErr = await err.response.json();
				toast.error(httpErr.message);
			});
	};

	const signup = async (email: string, password: string, name: string) => {
		await client
			.post('core/signup', { email, password, name })
			.then((response) => {
				toast.success(response.message);
				navigate('/');
			})
			.catch(async (err) => {
				const httpErr = await err.response.json();
				toast.error(httpErr.message);
			});
	};

	const forgotPassword = async (email: string) => {
		await client
			.post('core/forgot-password', { email })
			.then((response) => {
				toast(response.message);
				navigate('/');
			})
			.catch(async (err) => {
				const httpErr = await err.response.json();
				toast.error(httpErr.message);
			});
	};

	const logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('account');

		navigate('/');
	};

	return (
		<AuthContext.Provider
			value={{
				authenticated: Boolean(user),
				user,
				signin,
				signup,
				forgotPassword,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
