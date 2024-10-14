import React, { useState, useEffect } from "react";
import { GET, DELETE, PUT} from "../services/fetchHelper";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useParams, useNavigate } from "react-router-dom";
import { Itags, Iblogs } from "../types";

interface Option {
	value: number;
	label: string;
}

const EditBlog = () => {
	const { id } = useParams<{ id: string }>();
	const [tags, setTags] = useState<MultiValue<Option>>([]);
	const [options, setOptions] = useState<MultiValue<Option>>([]);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	const animatedComponents = makeAnimated();
	const nav = useNavigate();

	useEffect(() => {
		GET(`/api/blogs/${id}`).then((blog: Iblogs) => {
			setContent(blog.content);
			setTitle(blog.title);

			const blogTags: MultiValue<Option> = blog.tags.map((tag) => ({
				value: tag.id,
				label: tag.name,
			}));

			setTags(blogTags);
		});

		GET<Itags[]>("/api/tags").then((allTags) => {
			const tagOptions: MultiValue<Option> = allTags.map((tag: Itags) => ({
				value: tag.id,
				label: tag.name,
			}));
			setOptions(tagOptions);
		});
	}, []);

	const handSubmit = () => {
		const tagIds = tags.map((tag) => tag.value);
		console.log(tagIds);
		PUT(`/api/blogs/${id}`, { title, content, tags: tagIds }).then(() => {
			nav(`/blogs/${id}`);
		});
	};

	const deleteBlog = () => {
		DELETE(`/api/blogs/${id}`).then(() => {
			nav("/");
		});
	};

	return (
		<div className="container">
			<div className="row justify-content-center align-items-center">
				<h1 className="my-5 fw-bold text-center">Edit Blog</h1>
				<div className="col-12 col-md-6">
					<div className="mb-3">
						<label htmlFor="title" className="form-label fw-bold">
							Title
						</label>
						<input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" required />
					</div>
					<div className="mb-3">
						<label htmlFor="title" className="form-label fw-bold">
							Tags
						</label>

						<Select
							value={tags}
							components={animatedComponents}
							onChange={(newTags) => setTags(newTags)}
							options={options}
							isMulti
							className="basic-multi-select mb-3"
							classNamePrefix="select"
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="content" className="form-label fw-bold">
							Content
						</label>
						<textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-control large-textarea" required></textarea>
					</div>
					<button className="btn btn-info" onClick={handSubmit}>
						Save
					</button>
					<button className="btn btn-danger m-4" onClick={deleteBlog}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditBlog;