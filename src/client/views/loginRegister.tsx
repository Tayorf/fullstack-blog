import React, { useState } from "react";
import { POST, tokenKey } from "../services/fetchHelper";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const nav = useNavigate();

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const Url = isLogin ? "/auth/login" : "/auth/register";
		const rawData = {
			name,
			email,
			password,
		};

		POST(Url, rawData).then((data) => {
			localStorage.setItem(tokenKey, data.token);
			nav("/");
		});
	};

	return (
		<>
			<form>
				<h3>
					Currently {isLogin ? "logging in." : "Registering."}
					<span className="btn btn-info" onClick={() => setIsLogin(!isLogin)}>
						Need to switch?
					</span>
				</h3>
				<label htmlFor="">Email</label>
				<input className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
				{!isLogin && (
					<>
						<label htmlFor="">Name</label>
						<input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
					</>
				)}
				<label htmlFor="">Password</label>
				<input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			</form>
			<button className="btn btn-info" onClick={handleSubmit}>
				{isLogin ? "Login" : "Register."}
			</button>
		</>
	);
};

export default Register;