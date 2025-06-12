"use client";

import styles from "./TextSection.module.css";

export default function TextSection({
  title = "Welcome to My Creative Space",
  subtitle = "Exploring the Intersection of Design and Technology",
  firstParagraph = "Here you&apos;ll find a collection of my thoughts, ideas, and creative explorations. Each piece tells a story, each animation brings life to static elements, and every interaction is carefully crafted to create an engaging experience.",
  secondParagraph = "Through the combination of modern web technologies and creative design principles, we can create experiences that are both beautiful and functional. The animations you see here are powered by GSAP, bringing smooth, performant animations to life.",
}) {
  return (
    <div className={styles.textSection} data-highlight-text>
      <h2>{title}</h2>

      <p data-highlight-text>{firstParagraph}</p>

      <h3 data-highlight-text>{subtitle}</h3>

      <p data-highlight-text>{secondParagraph}</p>
    </div>
  );
}
