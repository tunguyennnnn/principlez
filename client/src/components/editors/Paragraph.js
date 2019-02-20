import React from 'react';

export default function Paragraph({ attributes, children }) {
  return <p {...attributes}>{children}</p>;
}
