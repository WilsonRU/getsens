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
					'Ops! Parece que você esqueceu de preencher este campo.';
			}

			if (fieldValidation?.type === 'email' && value) {
				if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
					newErrors[fieldName] = 'E-mail inválido';
				}
			}

			if (fieldValidation?.type === 'number' && value) {
				if (/\D/g.test(value)) {
					newErrors[fieldName] = 'Campo aceita apenas números';
				}
			}

			if (fieldValidation?.type === 'phone' && value) {
				const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
				if (!phoneRegex.test(value)) {
					newErrors[fieldName] = 'Formato inválido. Use (XX) XXXXX-XXXX';
				}
			}

			if (fieldValidation?.type === 'date' && value) {
				const dateValue = new Date(value);

				const dateRegex =
					/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
				if (!dateRegex.test(dateValue.toLocaleDateString('en-CA'))) {
					newErrors[fieldName] = 'Formato inválido.';
				}
			}

			if (fieldValidation?.type === 'cpf' && value) {
				const cpf = value.replace(/\D/g, '');

				if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
					newErrors[fieldName] = 'CPF deve conter 11 dígitos.';
				} else {
					let soma = 0;
					let resto: number;

					for (let i = 0; i < 9; i++)
						soma += Number.parseInt(cpf[i]) * (10 - i);
					resto = (soma * 10) % 11;
					if (resto === 10 || resto === 11) resto = 0;
					if (resto !== Number.parseInt(cpf[9])) {
						newErrors[fieldName] =
							'CPF inválido: primeiro dígito verificador incorreto.';
					} else {
						soma = 0;
						for (let i = 0; i < 10; i++)
							soma += Number.parseInt(cpf[i]) * (11 - i);
						resto = (soma * 10) % 11;
						if (resto === 10 || resto === 11) resto = 0;
						if (resto !== Number.parseInt(cpf[10])) {
							newErrors[fieldName] =
								'CPF inválido: segundo dígito verificador incorreto.';
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
