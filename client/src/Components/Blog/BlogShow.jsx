import React from 'react';

const BlogShow = ({ doc }) => {
  console.log(doc, 'blog show')
  const renderNodes = (nodes) => {
    if (!nodes || !Array.isArray(nodes)) return null;
    return nodes.map((node, index) => (
      <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
    ));
  };

  const renderNode = (node) => {
    const { type, attrs, content, text, marks } = node;

    switch (type) {
      case 'doc':
        return <div className="container mx-auto px-4 py-6">{renderNodes(content)}</div>;

      case 'heading': {
        const Tag = `h${attrs?.level || 1}`;
        const sizeClass = {
          1: 'text-4xl',
          2: 'text-3xl',
          3: 'text-2xl',
          4: 'text-xl',
        }[attrs.level] || 'text-base';
        return (
          <Tag className={`${sizeClass} font-semibold mt-6 mb-4 text-gray-800`}>
            {renderNodes(content)}
          </Tag>
        );
      }

      case 'paragraph':
        return (
          <p className="mb-4 text-base leading-relaxed text-gray-700">
            {renderNodes(content)}
          </p>
        );

      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6">
            {renderNodes(content)}
          </blockquote>
        );

      case 'image':
        return (
          <div className="my-6">
            <img
              src={attrs.src}
              alt={attrs.alt || ''}
              title={attrs.title || ''}
              className="w-full h-auto object-cover rounded-lg"
            />
            {attrs.caption && (
              <p className="text-sm text-center text-gray-500 mt-2">{attrs.caption}</p>
            )}
          </div>
        );

      case 'text':
        return applyMarks(text, marks);

      default:
        return renderNodes(content);
    }
  };

  const applyMarks = (textContent, marks = []) => {
    return marks.reduce((children, mark) => {
      switch (mark.type) {
        case 'bold':
          return <strong className="font-bold">{children}</strong>;
        case 'italic':
          return <em className="italic">{children}</em>;
        default:
          return children;
      }
    }, textContent);
  };

  return <div className="rich-text">{renderNode(doc)}</div>;
};

export default BlogShow;
