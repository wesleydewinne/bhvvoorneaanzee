import React from "react";

export default function ResponsiveImage({ src, srcSet, sizes, alt = "", className, loading = "lazy", decoding = "async", fetchPriority, width, height, style }) {
    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            className={className}
            loading={loading}
            decoding={decoding}
            fetchPriority={fetchPriority}
            width={width}
            height={height}
            style={style}
        />
    );
}
