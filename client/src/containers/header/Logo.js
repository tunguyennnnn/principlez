import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <span>
      <Link to="/" className="link">
        PRINCIPLEZ
      </Link>
    </span>
  );
}
