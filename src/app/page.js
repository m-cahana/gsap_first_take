"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { createNoise2D } from "simplex-noise";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";
import TextSection from "./components/TextSection";

export default function Home() {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    // Initial fade in animation
    gsap.to(scrollRef.current, {
      opacity: 1,
      duration: 3,
      delay: 0.2,
      ease: "power2.out",
    });

    // Making some circles noise
    const noise2D = createNoise2D();

    function createCircles() {
      for (let i = 0; i < 5000; i++) {
        const div = document.createElement("div");
        div.classList.add(styles.circle);
        const n1 = noise2D(i * 0.003, i * 0.0033);
        const n2 = noise2D(i * 0.002, i * 0.001);

        const style = {
          transform: `translate(${n2 * 200}px) rotate(${n2 * 270}deg) scale(${
            3 + n1 * 2
          }, ${3 + n2 * 2})`,
          boxShadow: `0 0 0 .2px hsla(${Math.floor(i * 0.3)}, 70%, 70%, .6)`,
        };
        Object.assign(div.style, style);
        contentRef.current.appendChild(div);
      }
      const Circles = document.querySelectorAll(`.${styles.circle}`);
      return Circles;
    }
    const Circles = createCircles();

    // Init ScrollSmoother
    const scrollerSmoother = ScrollSmoother.create({
      content: contentRef.current,
      wrapper: wrapperRef.current,
      smooth: 1,
      effects: false,
    });

    // Scroll Trigger for circles
    const main = gsap.timeline({
      scrollTrigger: {
        scrub: 0.7,
        start: "top 25%",
        end: "bottom bottom",
      },
    });
    Circles.forEach((circle) => {
      main.to(circle, {
        opacity: 1,
      });
    });

    // Text animation setup
    const splitHeadingTargets = document.querySelectorAll(
      "[data-highlight-text]"
    );

    splitHeadingTargets.forEach((heading) => {
      const scrollStart =
        heading.getAttribute("data-highlight-scroll-start") || "top 90%";
      const scrollEnd =
        heading.getAttribute("data-highlight-scroll-end") || "center 40%";
      const fadedValue = heading.getAttribute("data-highlight-fade") || 0.2;
      const staggerValue =
        heading.getAttribute("data-highlight-stagger") || 0.1;

      new SplitText(heading, {
        type: "words, chars",
        autoSplit: true,
        onSplit(self) {
          let ctx = gsap.context(() => {
            let tl = gsap.timeline({
              scrollTrigger: {
                scrub: true,
                trigger: heading,
                start: scrollStart,
                end: scrollEnd,
              },
            });
            tl.from(self.chars, {
              autoAlpha: fadedValue,
              stagger: staggerValue,
              ease: "linear",
            });
          });
          return ctx;
        },
      });
    });
  }, []);

  return (
    <div id="wrapper" ref={wrapperRef}>
      <div id="content" ref={contentRef}>
        <div className={styles.scroll} ref={scrollRef}>
          <span className={styles.name}>Michael Cahana</span>
          <svg viewBox="0 0 24 24">
            <line x1="12" y1="1" x2="12" y2="22.5" />
            <line x1="12.1" y1="22.4" x2="18.9" y2="15.6" />
            <line x1="11.9" y1="22.4" x2="5.1" y2="15.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
