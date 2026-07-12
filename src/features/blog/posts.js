const blogModules = import.meta.glob("./posts/*.js", {
    eager: true,
    import: "default",
});

export const posts = Object.values(blogModules)
    .filter(Boolean)
    .sort((postA, postB) => {
        return new Date(postB.seo.datePublished) - new Date(postA.seo.datePublished);
    });

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug);

export const getPostsByCategory = (category) => {
    return posts.filter((post) => post.category === category);
};

export const getLatestPosts = (amount = 3) => posts.slice(0, amount);
