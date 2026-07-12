import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import BlogBlock from "./BlogBlock.jsx";
import { posts } from "./posts.js"; // importeer je posts
import "./BlogDetail.css";

const BlogDetail = () => {
    const { slug } = useParams();
    const post = posts.find((p) => p.slug === slug);

    const page = useMemo(() => ({
        variant: "classic",
        hero: "cover",
        showCategory: true,
        showMetaInHeader: true,
        ...post?.page,
    }), [post?.page]);

    useBlogSeo(post, page);

    if (!post) return <p>Blog niet gevonden!</p>;

    const articleClassName = [
        "blog-container",
        `blog-container--${page.variant}`,
        `blog-container--hero-${page.hero}`,
        page.theme ? `blog-container--theme-${page.theme}` : "",
    ].filter(Boolean).join(" ");

    return (
        <article className={articleClassName}>
            {/* Header met afbeelding en overlay */}
            <header className="blog-header">
                {post.image ? (
                    <img src={post.image} alt={post.title} className="blog-image"/>
                ) : (
                    <div className="blog-image-placeholder"></div>
                )}

                <div className="blog-header__content">
                    {page.showCategory && (
                        <span className="blog-header__category">
                            {post.category || "Praktijktip"}
                        </span>
                    )}

                    <h1>{post.title}</h1>

                    {page.summary && (
                        <p className="blog-header__summary">{page.summary}</p>
                    )}

                    {page.showMetaInHeader && (
                        <p className="blog-header__meta">
                            {post.date} - Geschreven door {post.author}
                        </p>
                    )}
                </div>
            </header>

            {(page.highlight || hasTakeaways(page)) && (
                <div className="blog-intro-grid">
                    {page.highlight && (
                        <aside className="blog-page-highlight">
                            {page.highlight}
                        </aside>
                    )}

                    {hasTakeaways(page) && (
                        <section className="blog-takeaways" aria-labelledby="blog-takeaways-title">
                            <h2 id="blog-takeaways-title">Kort samengevat</h2>
                            <ul>
                                {page.takeaways.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            )}

            {/* Flexibele content */}
            <section className="blog-detail-content">
                {renderContentBlocks(post.content, page)}
            </section>

            {Array.isArray(post.faq) && post.faq.length > 0 && (
                <section className="blog-faq" aria-labelledby="blog-faq-title">
                    <h2 id="blog-faq-title">Veelgestelde vragen</h2>
                    {post.faq.map((item) => (
                        <article
                            key={item.question}
                            className={`blog-faq__item${item.link ? " blog-faq__item--has-link" : ""}`}
                        >
                            <h3>{item.question}</h3>
                            <p>{item.answer}</p>
                            {item.link && (
                                <a
                                    className="blog-faq__link"
                                    href={item.link.href}
                                    target={item.link.href?.startsWith("http") ? "_blank" : "_self"}
                                    rel={item.link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                    {item.link.text}
                                </a>
                            )}
                        </article>
                    ))}
                </section>
            )}

            {/* Footer met teruglink en metadata */}
            <footer className="blog-footer">
                <Link to="/blog" className="read-more">
                    Terug naar overzicht
                </Link>
                <p className="blog-meta">
                    {post.date} - Geschreven door {post.author}
                </p>
            </footer>
        </article>
    );
};

export default BlogDetail;

const SITE_URL = "https://bhvvoorneaanzee.nl";

function useBlogSeo(post, page) {
    useEffect(() => {
        if (!post) {
            return;
        }

        const url = `${SITE_URL}/blog/${post.slug}`;
        const description = post.seo?.description || page.summary || getFirstParagraph(post);
        const title = post.seo?.title || `${post.title} | BHV Voorne aan Zee`;
        const keywords = Array.isArray(post.seo?.keywords)
            ? post.seo.keywords.join(", ")
            : post.seo?.keywords;

        document.title = title;
        updateMeta('meta[name="description"]', "name", "description", description);
        updateMeta('meta[name="keywords"]', "name", "keywords", keywords);
        updateMeta('meta[property="og:title"]', "property", "og:title", title);
        updateMeta('meta[property="og:description"]', "property", "og:description", description);
        updateMeta('meta[property="og:url"]', "property", "og:url", url);
        updateMeta('meta[property="og:type"]', "property", "og:type", "article");
        updateMeta('meta[property="og:site_name"]', "property", "og:site_name", "BHV Voorne aan Zee");
        updateMeta('meta[property="og:image"]', "property", "og:image", post.seo?.image || post.image);
        updateMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
        updateMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
        updateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
        updateMeta('meta[name="twitter:image"]', "name", "twitter:image", post.seo?.image || post.image);
        updateCanonical(url);
        injectBlogJsonLd(createBlogJsonLd(post, page, url, description));
    }, [post, page]);
}

function getFirstParagraph(post) {
    return post.content?.find((block) => block.type === "paragraph")?.text || "";
}

function hasTakeaways(page) {
    return Array.isArray(page.takeaways) && page.takeaways.length > 0;
}

function renderContentBlocks(content, page) {
    const blocks = [];
    let index = 0;

    while (index < content.length) {
        const block = content[index];

        const hasMediaPair =
            page.featureMediaPair &&
            block.type === "heading" &&
            content[index + 1]?.type === "paragraph" &&
            (
                content[index + 2]?.type === "video" ||
                (content[index + 2]?.type === "heading" && content[index + 3]?.type === "video")
            );

        if (hasMediaPair) {
            const copyBlocks = [block, content[index + 1]];
            const mediaBlocks = content[index + 2]?.type === "video"
                ? [content[index + 2]]
                : [content[index + 2], content[index + 3]];

            blocks.push(
                <section className="blog-content-section blog-content-section--media-pair" key={block.id || `media-pair-${index}`}>
                    <div className="blog-media-pair__copy">
                        {copyBlocks.map((copyBlock) => (
                            <BlogBlock key={copyBlock.id || copyBlock.text} block={copyBlock}/>
                        ))}
                    </div>
                    <div className="blog-media-pair__media">
                        {mediaBlocks.map((mediaBlock) => (
                            <BlogBlock key={mediaBlock.id || mediaBlock.text} block={mediaBlock}/>
                        ))}
                    </div>
                </section>
            );

            index += 2 + mediaBlocks.length;
            continue;
        }

        if (block.type === "heading") {
            const sectionBlocks = [block];
            index += 1;

            while (
                index < content.length &&
                content[index]?.type !== "heading" &&
                content[index]?.type !== "link" &&
                content[index]?.type !== "blockquote" &&
                content[index]?.type !== "separator"
            ) {
                sectionBlocks.push(content[index]);
                index += 1;
            }

            const isWideSection = sectionBlocks.some((sectionBlock) =>
                sectionBlock.wide || ["video", "image", "list"].includes(sectionBlock.type)
            );
            const hasImage = sectionBlocks.some((sectionBlock) => sectionBlock.type === "image");

            if (isWideSection && hasImage) {
                const imageBlocks = sectionBlocks.filter((sectionBlock) => sectionBlock.type === "image");
                const copyBlocks = sectionBlocks.filter((sectionBlock) => sectionBlock.type !== "image");

                blocks.push(
                    <section
                        className="blog-content-section blog-content-section--wide blog-content-section--image-pair"
                        key={block.id || `section-${index}`}
                    >
                        <div className="blog-image-pair__media">
                            {imageBlocks.map((imageBlock) => (
                                <BlogBlock key={imageBlock.id || imageBlock.src} block={imageBlock}/>
                            ))}
                        </div>
                        <div className="blog-image-pair__copy">
                            {copyBlocks.map((copyBlock) => (
                                <BlogBlock key={copyBlock.id || copyBlock.text} block={copyBlock}/>
                            ))}
                        </div>
                    </section>
                );

                continue;
            }

            blocks.push(
                <section
                    className={`blog-content-section ${isWideSection ? "blog-content-section--wide" : ""}`}
                    key={block.id || `section-${index}`}
                >
                    {sectionBlocks.map((sectionBlock) => (
                        <BlogBlock key={sectionBlock.id || sectionBlock.text} block={sectionBlock}/>
                    ))}
                </section>
            );

            continue;
        }

        if (block.type === "link") {
            const links = [];

            while (content[index]?.type === "link") {
                links.push(content[index]);
                index += 1;
            }

            blocks.push(
                <div className="blog-link-grid" key={`links-${index}`}>
                    {links.map((linkBlock) => (
                        <BlogBlock key={linkBlock.id || linkBlock.href} block={linkBlock}/>
                    ))}
                </div>
            );

            continue;
        }

        if (["blockquote", "separator"].includes(block.type)) {
            blocks.push(<BlogBlock key={block.id || index} block={block}/>);
            index += 1;
            continue;
        }

        blocks.push(
            <div className="blog-content-section blog-content-section--lede" key={block.id || index}>
                <BlogBlock block={block}/>
            </div>
        );
        index += 1;
    }

    return blocks;
}

function updateMeta(selector, attrName, attrValue, content) {
    let tag = document.head.querySelector(selector);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content || "");
}

function updateCanonical(href) {
    let link = document.head.querySelector('link[rel="canonical"]');

    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
    }

    link.setAttribute("href", href);
}

function injectBlogJsonLd(json) {
    const scriptId = "blog-detail-jsonld";
    let script = document.head.querySelector(`#${scriptId}`);

    if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(json);
}

function createBlogJsonLd(post, page, url, description) {
    const graph = [
        {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.seo?.headline || post.title,
            name: post.title,
            description,
            url,
            inLanguage: "nl-NL",
            datePublished: post.seo?.datePublished || post.date,
            dateModified: post.seo?.dateModified || post.date,
            mainEntityOfPage: url,
            image: post.seo?.image || post.image,
            author: {
                "@type": "Person",
                name: post.author || "Wesley",
            },
            publisher: {
                "@type": "Organization",
                name: "BHV Voorne aan Zee",
                url: SITE_URL,
                logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/assets/image/logo.png`,
                },
            },
            about: post.seo?.about || post.category || "BHV en veiligheid",
            keywords: post.seo?.keywords,
            articleSection: post.category || "Kennisbank",
        },
    ];

    if (Array.isArray(page.takeaways) && page.takeaways.length > 0) {
        graph.push({
            "@type": "ItemList",
            "@id": `${url}#takeaways`,
            name: "Kort samengevat",
            itemListElement: page.takeaways.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item,
            })),
        });
    }

    if (Array.isArray(post.faq) && post.faq.length > 0) {
        graph.push({
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: post.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                },
            })),
        });
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}
