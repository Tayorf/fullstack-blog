import React, { useEffect, useState } from "react";
import { GET } from "../services/fetchHelper";
import { Navigate } from "react-router-dom";

interface AuthWrapperProps {
	children: React.ReactNode;
}

const AuthWrapper = (props: AuthWrapperProps) => {
	const [isGood, setIsgood] = useState(false);
	const [hasChecked, setHasChecked] = useState(false);

	useEffect(() => {
		GET("/auth/checkem")
			.then(() => setIsgood(true))
			.finally(() => setHasChecked(true));
	}, []);

	if (!hasChecked) {
		return <></>;
	}

	if (!isGood) {
		return <Navigate to={"/login"}></Navigate>;
	}

	return <>{props.children}</>;
};

export default AuthWrapper;