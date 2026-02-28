import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogSection.css";

const BlogSection = ({ posts = [], title = "Blog", limit = 10, showHeaderButton = true }) => {
    const navigate = useNavigate();
    const listRef = useRef(null);

    if (!Array.isArray(posts) || posts.length === 0) return null;

    const scrollLeft = () => listRef.current.scrollBy({ left: -260, behavior: "smooth" });
    const scrollRight = () => listRef.current.scrollBy({ left: 260, behavior: "smooth" });

    return (
        <section className="section-blog">
            <h2 className="section-blog-title">{title}</h2>

            <div className="section-blog-cards-container">
                <div className="section-blog-list" ref={listRef}>
                    {posts.slice(0, limit).map((post) => (
                        <div
                            key={post.slug}
                            className="section-blog-card"
                            onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                            {post.image ? (
                                <img src={post.image} alt={post.title} className="section-blog-card-image" />
                            ) : (
                                <div className="section-blog-card-placeholder"></div>
                            )}
                            <h3>{post.title}</h3>
                            <p>
                                {post.content && Array.isArray(post.content)
                                    ? post.content
                                        .filter((b) => b.type === "paragraph")
                                        .map((b) => b.text)
                                        .join(" ")
                                        .slice(0, 80)
                                    : ""}
                                {post.content && post.content.length > 0 ? "..." : ""}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="section-blog-nav">
                    <button className="scroll-btn left" onClick={scrollLeft}>
                        &#8592;
                    </button>
                    {showHeaderButton && (
                        <button className="more-btn" onClick={() => navigate("/blog")}>
                            ...Meer blogs
                        </button>
                    )}
                    <button className="scroll-btn right" onClick={scrollRight}>
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
