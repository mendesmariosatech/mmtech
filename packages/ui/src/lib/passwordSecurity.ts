import React from "react";

export  function PasswordSecurity() {
    const [passwordValidations, setPasswordValidations] = React.useState({
		hasLetter: false,
		hasDigit: false,
		isLongEnough: false,
	});

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const hasLetter = /[A-Z]/.test(value);
		const hasDigit = /\d/.test(value);
		const isLongEnough = value.length >= 8;

		setPasswordValidations({
			hasLetter,
			hasDigit,
			isLongEnough,
		});
	};

    return { passwordValidations, handlePasswordChange };
}