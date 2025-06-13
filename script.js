// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function createScrollAnimation(className) {
  // Set initial states
  gsap.set(`li.${className} > span`, { transformOrigin: "0 50%" });
  gsap.set(`li.${className}:not(:first-of-type) span`, {
    opacity: 0.2,
    scale: 0.8,
  });

  // Create the animation timeline
  const tl = gsap
    .timeline()
    .to(`li.${className}:not(:first-of-type) span`, {
      opacity: 1,
      scale: 1,
      stagger: 0.5,
    })
    .to(
      `li.${className}:not(:last-of-type) span`,
      { opacity: 0.2, scale: 0.8, stagger: 0.5 },
      0
    );

  // Create the scroll trigger
  ScrollTrigger.create({
    trigger: `h1.${className}`,
    start: "top 10%",
    endTrigger: `li.${className}:last-of-type`,
    end: "top 10%",
    pin: true,
    animation: tl,
    scrub: true,
  });
}

// Apply the animation to different sections
createScrollAnimation("projects");
createScrollAnimation("work");
