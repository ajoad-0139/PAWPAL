export const extractHeadings = (node) => {
  let results = [];
  const visit = (n) => {
    if (n.type === 'heading') {
      const text = (n.content || [])
        .map((c) =>
          c.type === 'text'
            ? c.text
            : (c.content || []).map((g) => g.text || '').join('')
        )
        .join('');
      results.push({ level: n.attrs?.level ?? 1, text });
    }
    (n.content || []).forEach(visit);
  };
  visit(node);
  return results;
};
export const extractFirstImageUrl = (contentArray) => {
  for (const node of contentArray) {
    if (node.type === 'image' && node.attrs && node.attrs.src) {
      return node.attrs.src;
    }
  }
  return '';
};

export const extractFirstParagraph = (doc) => {
  for (const node of doc) {
    if (node.type === 'paragraph' && Array.isArray(node.content)) {
      return node.content.map((part) => part.text || '').join('');
    }
  }
  return null;
};

export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export const extractPublicIds = (node, ids = new Set()) => {
  if (node.type === 'image' && node.attrs?.public_id) {
    ids.add(node.attrs.public_id);
  }
  node.content?.forEach((child) => extractPublicIds(child, ids));
  return ids;
};
