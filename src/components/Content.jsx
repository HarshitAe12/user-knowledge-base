import React from "react";
import parse, { domToReact } from "html-react-parser";
import "./content.css";

const Content = ({ post }) => {
  if (!post) return <p>Loading...</p>;

  const safeBody = typeof post.body === "string" ? post.body : "";

  // Parse options for HTML content
  const options = {
    replace: (domNode) => {
      if (domNode.type === "tag") {
        const children = domToReact(domNode.children || [], options);

        switch (domNode.name) {
          case "h1":
            return <h1 className="content-h1">{children}</h1>;
          case "h2":
            return <h2 className="content-h2">{children}</h2>;
          case "h3":
            return <h3 className="content-h3">{children}</h3>;
          case "h4":
            return <h4 className="content-h4">{children}</h4>;
          case "h5":
            return <h5 className="content-h5">{children}</h5>;
          case "h6":
            return <h6 className="content-h6">{children}</h6>;
          case "p":
            return <p className="content-p">{children}</p>;
          case "ul":
            return <ul className="content-ul">{children}</ul>;
          case "ol":
            return <ol className="content-ol">{children}</ol>;
          case "li":
            return <li className="content-li">{children}</li>;
          case "strong":
            return <strong className="content-strong">{children}</strong>;
          case "em":
            return <em className="content-em">{children}</em>;
          case "a":
            return (
              <a
                className="content-link"
                href={domNode.attribs?.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          case "img":
            return (
              <img
                className="content-img"
                src={domNode.attribs?.src}
                alt={domNode.attribs?.alt || ""}
              />
            );
          case "blockquote":
            return (
              <blockquote className="content-blockquote">{children}</blockquote>
            );
          case "br":
            return <br />;
          default:
            return;
        }
      }
    },
  };

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="content-container">
      {/* Featured Image or Video */}
      <div className="media-wrapper">
        {post.featured_video ? (
          <video
            src={post.featured_video}
            controls
            className="media-element"
          />
        ) : post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title || "Featured Image"}
            className="media-element"
          />
        ) : (
          <img
            src="/assets/placeholder-image.png"
            alt="Placeholder"
            className="media-element"
          />
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`tag-item ${index % 2 === 0 ? "blue-tag" : "green-tag"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Parsed Body */}
      <div className="content-body">
        {safeBody ? parse(safeBody, options) : <p>No content available.</p>}
      </div>
    </div>
  );
};

export default Content;
