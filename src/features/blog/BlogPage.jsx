import React from "react";
import { Link } from "react-router-dom";
import { posts } from "./posts.js";
import "./BlogPage.css";

const getExcerpt = (post) => {
    const text = post.content
        ?.filter((block) => block.type === "paragraph")
        .map((block) => block.text)
        .join(" ");

    if (!text) {
        return "";
    }

    return text.length > 155 ? `${text.slice(0, 155).trim()}...` : text;
};

const BlogPage = () => {
    return (
        <section className="blog-page">
            <div className="blog-page__overlay" aria-hidden="true" />

            <header className="blog-page__header">
                <p className="blog-page__label">Kennisbank</p>

                <h1>Veiligheidsinzichten uit de praktijk</h1>

                <p className="blog-page__intro">
                    Artikelen over BHV, ontruiming en veilig werken binnen organisaties.
                </p>
            </header>

            <div className="blog-list">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="blog-card"
                        aria-label={`Lees meer over ${post.title}`}
                    >
                        {post.image && (
                            <div className="blog-card__image-wrapper">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="blog-card__image"
                                />
                            </div>
                        )}

                        <div className="blog-card__content">
                            <span className="blog-card__tag">
                                {post.category || "Praktijktip"}
                            </span>

                            <h2>{post.title}</h2>

                            <p>{getExcerpt(post)}</p>

                            <div className="blog-card__footer">
                                <span>Lees artikel</span>
                                <span aria-hidden="true">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default BlogPage;