import React from 'react';

function PrinciplezIntro() {
  return (
    <div className="introduction">
      <blockquote>
        <small>
          Pain + Reflection = Progress
          <cite title="Source Title"> Ray Dalio, Principles</cite>
        </small>
      </blockquote>
      <blockquote>
        <small>
          It is far more common for people to allow ego to stand in the way of
          learning.
          <br />
          <cite title="Source Title"> Ray Dalio, Principles</cite>
        </small>
      </blockquote>
    </div>
  );
}

export default function HomeMenu() {
  return (
    <div className="home-menu-container">
      <PrinciplezIntro />
    </div>
  );
}
