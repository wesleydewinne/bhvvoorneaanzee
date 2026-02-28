import React from "react";
import { useParams, Link } from "react-router-dom";
import BlogBlock from "./BlogBlock.jsx";
import { posts } from "./posts.js"; // importeer je posts
import "./BlogDetail.css";

const BlogDetail = () => {
    const { slug } = useParams();
    const post = posts.find((p) => p.slug === slug);

    if (!post) return <p>Blog niet gevonden!</p>;

    return (
        <article className="blog-container">
            {/* Header met afbeelding en overlay */}
            <header className="blog-header">
                {post.image ? (
                    <img src={post.image} alt={post.title} className="blog-image"/>
                ) : (
                    <div className="blog-image-placeholder"></div>
                )}
                <h1>{post.title}</h1>
            </header>

            {/* Flexibele content */}
            <section className="blog-detail-content">
                {post.content.map((block, index) => (
                    <BlogBlock key={index} block={block}/>
                ))}
            </section>

            {/* Footer met teruglink en metadata */}
            <footer className="blog-footer">
                <Link to="/blog" className="read-more">
                    ← Terug naar overzicht
                </Link>
                <p className="blog-meta">
                    {post.date} • Geschreven door {post.author}
                </p>
            </footer>
        </article>
    );
};

export default BlogDetail;
