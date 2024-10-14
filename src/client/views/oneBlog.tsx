import React, { useState, useEffect } from "react";
import { Iauthors, IblogTags, Iblogs, Itags } from "../types";
import { GET } from "../services/fetchHelper";
import { Link, useParams } from "react-router-dom";

interface Option {}

const OneBlog = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState<Iblogs>();
	const [authors, setAuthors] = useState<Iauthors[]>([]);
	const [blogTags, setBlogTags] = useState<IblogTags[]>([]);
	const [tags, setTags] = useState<Itags[]>([]);
	const [expanded, setExpanded] = useState(false);

	const previewLength = 250;

	// Fetching content
	useEffect(() => {
		GET(`/api/blogs/${id}`).then((data) => {
			setBlog(data);
			setTags(data.tags);
		});
	}, [id]);

	// Display Tags.
	const getTags = () => {
		const tagsForBlog = tags
			.map((tag) => {
				return tag ? (
					<span key={`tag-${tag.id}`} className="blog-tags bg-secondary shadow shadow-sm rounded-pill px-2 py-1 m-1 fw-bold">
						{tag.name}
					</span>
				) : null;
			})
			.filter((tag) => tag !== null);

		return tagsForBlog.length > 0 ? tagsForBlog : null;
	};

	return (
		<div className="container">
			<h1 className="my-5 fw-bold text-center">Blog Details</h1>
			<div className="row justify-content-center">
				{blog && (
					<div className="col-12 col-md-8 mb-4">
						<div className="card m-4 shadow shadow-sm">
							<div className="card-body p-4">
								<h2 className="card-title fw-bold m-4">{blog.title}</h2>
								<div className="card-text m-4">
									{expanded || blog.content.length <= previewLength
										? blog.content.split("\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
										: `${blog.content.substring(0, previewLength)}... `}
									<a className="text-decoration-none pe-auto" onClick={() => setExpanded(!expanded)}>
										{expanded ? "Read less" : "Read more"}
									</a>
								</div>
								<h6 className="card-subtitle mb-2 m-4">
									by {blog.name} on {new Date(blog.created_at).toLocaleString()}
								</h6>
								<div className="card-subtitle m-4 d-flex flex-wrap align-items-center">{getTags()}</div>
								<Link to={`/blogs/${blog.id}/edit`} className="btn btn-info m-4 fw-bold">
									Edit
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OneBlog;