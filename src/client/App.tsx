import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBlogs from "./views/createBlogs";
import Home from "./views/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Admin from "./views/admin";
import EditBlog from "./views/editBlogs";
import OneBlog from "./views/oneBlog";
import Contact from "./views/contact";
import Donate from "./views/donate";
import Thanks from "./views/thanks";
import Register from "./views/loginRegister";
import AuthWrapper from "./components/authwraper";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<AuthWrapper>
							<Home />
						</AuthWrapper>
					}
				/>
				<Route
					path="/blogs/new"
					element={
						<AuthWrapper>
							<CreateBlogs />
						</AuthWrapper>
					}
				/>
				<Route
					path="/blogs/:id"
					element={
						<AuthWrapper>
							<OneBlog />
						</AuthWrapper>
					}
				/>
				<Route
					path="/blogs/:id/edit"
					element={
						<AuthWrapper>
							<EditBlog />
						</AuthWrapper>
					}
				/>
				<Route
					path="/admin"
					element={
						<AuthWrapper>
							<Admin />
						</AuthWrapper>
					}
				/>
				<Route path="/contact" element={<Contact />} />
				<Route path="/donate" element={<Donate />} />
				<Route path="/thank-you" element={<Thanks />} />
				<Route path="/login" element={<Register />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;