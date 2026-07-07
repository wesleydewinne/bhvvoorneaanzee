import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogSection.css";

const BlogSection = ({
    posts = [],
    title = "Veiligheidsinzichten uit de praktijk",
    subtitle = "Praktische artikelen over BHV, EHBO, ontruiming en veilig werken op locatie.",
    limit = 10,
    showHeaderButton = true,
}) => {
    const navigate = useNavigate();
    const listRef = useRef(null);

    if (!Array.isArray(posts) || posts.length === 0) return null;

    const scrollLeft = () => listRef.current.scrollBy({ left: -260, behavior: "smooth" });
    const scrollRight = () => listRef.current.scrollBy({ left: 260, behavior: "smooth" });

    return (
        <section className="section-blog">
            <div className="section-blog-header">
                <span className="section-blog-eyebrow">Kennisbank</span>
                <h2 className="section-blog-title">{title}</h2>
                <p className="section-blog-subtitle">{subtitle}</p>
            </div>

            <div className="section-blog-cards-container">
                <div className="section-blog-list" ref={listRef}>
                    {posts.slice(0, limit).map((post) => (
                        <div
                            key={post.slug}
                            className="section-blog-card"
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    navigate(`/blog/${post.slug}`);
                                }
                            }}
                        >
                            <div className="section-blog-card-media">
                                {post.image ? (
                                    <img src={post.image} alt={post.title} className="section-blog-card-image" />
                                ) : (
                                    <div className="section-blog-card-placeholder"></div>
                                )}
                            </div>
                            <div className="section-blog-card-content">
                                <span className="section-blog-card-label">Praktijktip</span>
                                <h3>{post.title}</h3>
                                <p>
                                    {post.content && Array.isArray(post.content)
                                        ? post.content
                                            .filter((b) => b.type === "paragraph")
                                            .map((b) => b.text)
                                            .join(" ")
                                            .slice(0, 105)
                                        : ""}
                                    {post.content && post.content.length > 0 ? "..." : ""}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-blog-nav">
                    <button className="scroll-btn left" onClick={scrollLeft} aria-label="Vorige artikelen">
                        &#8592;
                    </button>
                    {showHeaderButton && (
                        <button className="more-btn" onClick={() => navigate("/blog")}>
                            Bekijk alle artikelen
                        </button>
                    )}
                    <button className="scroll-btn right" onClick={scrollRight} aria-label="Volgende artikelen">
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
