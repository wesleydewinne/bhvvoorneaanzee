import React from "react";
import { Link } from "react-router-dom";
import { posts } from "./posts";
import "./BlogPage.css";

const BlogPage = () => {
    return (
        <section className="blog-page">
            <h1>Overzicht van de blogs</h1>

            <div className="blog-list">
                {posts.map((post) => (
                    <article key={post.slug} className="blog-card">
                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.title}
                                className="blog-card-image"
                            />
                        )}
                        <h2>{post.title}</h2>
                        <p>
                            {post.content
                                .filter((block) => block.type === "paragraph")
                                .map((block) => block.text)
                                .join(" ")
                                .slice(0, 150)}
                            ...
                        </p>

                        <div className="blog-card-footer">
                            <Link to={`/blog/${post.slug}`} className="read-more">
                                Lees meer →
                            </Link>
                            <div className="blog-meta">
                                <p className="date">{post.date}</p>
                                <p className="author">Geschreven door {post.author}</p>
                            </div>

                        </div>
                    </article>
                ))}
            </div>
        </section>

    );
};

export default BlogPage;
