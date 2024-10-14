import React, { useState, useEffect } from "react";
import { Iauthors, IblogTags, Iblogs, Itags } from "../types";
import { GET } from "../services/fetchHelper";
import { Link } from "react-router-dom";

const Home = () => {
	const [blogs, setBlogs] = useState<Iblogs[]>([]);
	const [authors, setAuthors] = useState<Iauthors[]>([]);
	const [blogTags, setBlogTags] = useState<IblogTags[]>([]);
	const [tags, setTags] = useState<Itags[]>([]);
	const [expandedBlogs, setExpandedBlogs] = useState<{ [key: number]: boolean }>({});

	const previewLength = 250;

	// Fetching content
	useEffect(() => {
		GET("/api/blogs").then(setBlogs);
		GET("/api/authors").then(setAuthors);
		GET("/api/blogtags").then(setBlogTags);
		GET("/api/tags").then(setTags);
	}, []);

	// Display Author who wrote the blog.
	const getAuthor = (authorId: number) => {
		const author = authors.find((author) => author.id === authorId);
		return author ? author.name : "uknown";
	};

	// Display Tags.
	const getTags = (blogId: number) => {
		const blogTag = blogTags.filter((blogTag) => blogTag.blog_id === blogId);
		const tagsForBlog = blogTag
			.map((tag) => {
				const tagObject = tags.find((t) => t.id === tag.tag_id);
				return tagObject ? (
					<span key={`tag-object-${tagObject.id}`} className="blog-tags bg-secondary shadow shadow-sm rounded-pill px-2 py-1 m-1 fw-bold">
						{tagObject.name}
					</span>
				) : null;
			})
			.filter((tag) => tag !== null);

		return tagsForBlog.length > 0 ? tagsForBlog : null;
	};

	// Toggle read more for a specific blog
	const toggleReadMore = (blogId: number) => {
		setExpandedBlogs((prev) => ({
			...prev,
			[blogId]: !prev[blogId],
		}));
	};

	return (
		<>
			<img className="w-100" src="/assets/MainPhoto.png" alt="golf image" />
			<div className="container">
				<h1 className="my-5 fw-bold text-center">Blog Posts</h1>
				<div className="row">
					{blogs.map((blog) => (
						<div className="col-12 col-md-6 mb-4" key={`blog-card-${blog.id}`}>
							<div className="card m-4 shadow shadow-sm">
								<div className="card-body p-4">
									<h2 className="card-title fw-bold m-4">{blog.title}</h2>
									<div className="card-text m-4">
										{expandedBlogs[blog.id] || blog.content.length <= previewLength
											? blog.content.split("\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
											: `${blog.content.substring(0, previewLength)}... `}
										<a className="text-decoration-none pe-auto" onClick={() => toggleReadMore(blog.id)}>
											{expandedBlogs[blog.id] ? " read less" : " read more"}
										</a>
									</div>
									<h6 className="card-subtitle mb-2 m-4">
										by {getAuthor(blog.author_id)} on {new Date(blog.created_at).toLocaleString()}
									</h6>
									{getTags(blog.id) && <div className="card-subtitle m-4 d-flex flex-wrap align-items-center">{getTags(blog.id)}</div>}
									<Link to={`/blogs/${blog.id}/edit`} className="btn btn-info m-4 fw-bold">
										Edit
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;