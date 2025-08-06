import { useState } from 'react';

type FieldValidations = {
	required?: boolean;
	type?: 'email' | 'number' | 'phone' | 'date' | 'cpf' | string;
};

type Validations<T> = {
	[K in keyof T]?: FieldValidations;
};

type FormFields = Record<string, any>;

const useForm = <T extends FormFields>(
	initialState: T,
	validations: Validations<T>,
) => {
	const [fields, setFields] = useState<T>(initialState);
	const [errors, setErrors] = useState<Record<keyof T, string>>(
		{} as Record<keyof T, string>,
	);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		validate();

		const { name, value } = e.target;
		setFields({ ...fields, [name]: value });
	};

	const setValues = (newFields: Partial<T>) => {
		setFields({ ...fields, ...newFields });
	};

	const validate = (): boolean => {
		const newErrors: Record<string, string> = {};

		for (const [fieldName, fieldValidation] of Object.entries(validations)) {
			const value = fields[fieldName as keyof T];

			if (fieldValidation?.required && !value) {
				newErrors[fieldName] =
					'Oops! Looks like you forgot to fill in this field..';
			}

			if (fieldValidation?.type === 'email' && value) {
				if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
					newErrors[fieldName] = 'Invalid email';
				}
			}

			if (fieldValidation?.type === 'number' && value) {
				if (/\D/g.test(value)) {
					newErrors[fieldName] = 'Field only accepts numbers';
				}
			}

			if (fieldValidation?.type === 'phone' && value) {
				const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
				if (!phoneRegex.test(value)) {
					newErrors[fieldName] = 'Invalid format. Use (XX) XXXXX-XXXX';
				}
			}

			if (fieldValidation?.type === 'date' && value) {
				const dateValue = new Date(value);

				const dateRegex =
					/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
				if (!dateRegex.test(dateValue.toLocaleDateString('en-CA'))) {
					newErrors[fieldName] = 'Invalid format.';
				}
			}

			if (fieldValidation?.type === 'password' && value) {
				const passwordRegex = /^(?=.*\d)(?=.*[!@#$%&])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
				if (!passwordRegex.test(value)) {
					newErrors[fieldName] = 'Use 6+ chars with a number, symbol, and upper/lowercase letters.';
				}
			}

			if (fieldValidation?.type === 'cpf' && value) {
				const cpf = value.replace(/\D/g, '');

				if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
					newErrors[fieldName] = 'CPF must contain 11 digits.';
				} else {
					let soma = 0;
					let resto: number;

					for (let i = 0; i < 9; i++)
						soma += Number.parseInt(cpf[i]) * (10 - i);
					resto = (soma * 10) % 11;
					if (resto === 10 || resto === 11) resto = 0;
					if (resto !== Number.parseInt(cpf[9])) {
						newErrors[fieldName] =
							'Invalid CPF: first check digit incorrect.';
					} else {
						soma = 0;
						for (let i = 0; i < 10; i++)
							soma += Number.parseInt(cpf[i]) * (11 - i);
						resto = (soma * 10) % 11;
						if (resto === 10 || resto === 11) resto = 0;
						if (resto !== Number.parseInt(cpf[10])) {
							newErrors[fieldName] =
								'Invalid CPF: incorrect second verification digit.';
						}
					}
				}
			}
		}

		setErrors(newErrors as Record<keyof T, string>);
		return Object.keys(newErrors).length === 0;
	};

	const clear = () => {
		setFields(initialState);
		setErrors({} as Record<keyof T, string>);
	};

	return { fields, errors, handleChange, clear, setValues, validate };
};

export default useForm;
