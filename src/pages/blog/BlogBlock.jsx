import React from "react";

const BlogBlock = ({ block }) => {
    const blockClass = `blog-block ${block.id || ""}`;

    switch (block.type) {
        case "paragraph":
            return <p className={blockClass}>{block.text}</p>;

        case "heading":
            const Tag = `h${block.level || 2}`;
            return <Tag className={blockClass}>{block.text}</Tag>;

        case "list":
            return (
                <ol className={blockClass}>
                    {block.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ol>
            );

        case "image":
            return (
                <img
                    className={`${blockClass} blog-inline-image`}
                    src={block.src}
                    alt={block.alt || "Blog afbeelding"}
                />
            );

        case "blockquote":
            return ( <blockquote className={blockClass}>{block.text}</blockquote>
        );


        case "video":
            return (
                <iframe
                    className={blockClass}
                    src={block.src}
                    title={block.id || "video"}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            );

        case "separator":
            return <hr className={blockClass} />;

        default:
            return null;
    }
};

export default BlogBlock;
