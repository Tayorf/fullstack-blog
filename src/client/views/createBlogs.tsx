import React, { useState, useEffect } from "react";
import { GET, POST } from "../services/fetchHelper";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import type { Itags } from "../types";

interface Option {
	value: number;
	label: string;
}

const CreateBlogs = () => {
	const [tags, setTags] = useState<MultiValue<Option>>([]);
	const [options, setOptions] = useState<MultiValue<Option>>([]);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const animatedComponents = makeAnimated();
	const nav = useNavigate();

	useEffect(() => {
		GET<Itags[]>("/api/tags").then((tags) => {
			setOptions(tags.map((tag) => ({ value: tag.id, label: tag.name })));
		});
	}, []);

	const handleSubmit = () => {
		const tagIds = tags.map((tag) => tag.value);
		POST("/api/blogs", { title, content, tags: tagIds }).then((blog) => {
			nav(`/blogs/${blog.id}`);
		});
	};

	return (
		<div className="container">
			<div className="row justify-content-center align-items-center">
				<h1 className="my-5 fw-bold text-center">Create Blog</h1>
				<div className="col-12 col-md-6">
					<div className="mb-3">
						<label htmlFor="title" className="form-label fw-bold">
							Title
						</label>
						<input className="form-control" onChange={(e) => setTitle(e.target.value)} required />
					</div>
					<div className="mb-3">
						<label htmlFor="title" className="form-label fw-bold">
							Tags
						</label>

						<Select value={tags} components={animatedComponents} onChange={setTags} options={options} isMulti className="basic-multi-select mb-3" classNamePrefix="select" required />
					</div>
					<div className="mb-3">
						<label htmlFor="content" className="form-label fw-bold ">
							Content
						</label>
						<textarea className="form-control large-textarea" onChange={(e) => setContent(e.target.value)} required></textarea>
					</div>
					<button type="submit" onClick={handleSubmit} className="btn btn-info">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateBlogs;