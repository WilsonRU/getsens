import { useContext, type ReactNode } from 'react';
import {
	Route,
	useLocation,
	Routes as Routing,
	Navigate,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthContext, AuthProvider } from '@/utils/contexts/authContexts';
import { ShieldWarningIcon } from '@phosphor-icons/react';

// Modules
import { ForgotPassword, Signin, Signup } from '@/modules/core';

interface GuardProps {
	children: ReactNode;
}

export default function Routes() {
	const location = useLocation();

	const Guard: React.FC<GuardProps> = ({ children }) => {
		const { authenticated } = useContext(AuthContext) as {
			authenticated: boolean;
		};

		if (!authenticated) {
			return <Navigate to={'/'} />;
		}
		return <>{children}</>;
	};

	return (
		<AuthProvider>
			<AnimatePresence mode="wait">
				<Routing key={location.pathname} location={location}>
					<Route index element={<Signin />} />

					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />

					<Route
						path="*"
						element={
							<div className="flex flex-col gap-2 items-center justify-center h-screen text-white">
								<ShieldWarningIcon size={36} />
								<span className="text-bold uppercase">No content found</span>
							</div>
						}
					/>
				</Routing>
			</AnimatePresence>
		</AuthProvider>
	);
}
