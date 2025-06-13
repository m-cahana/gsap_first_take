/*------------------------------
Register plugins
------------------------------*/
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const content = document.querySelector("#content");

/*------------------------------
Making some circles noise
------------------------------*/
const simplex = new SimplexNoise();
for (let i = 0; i < 5000; i++) {
  const svg = document.createElement("img");
  svg.src = "svgs/silver_groups.svg";
  svg.classList.add("svg");
  const n1 = simplex.noise2D(i * 0.003, i * 0.0033);
  const n2 = simplex.noise2D(i * 0.002, i * 0.001);

  const style = {
    transform: `translate(${n2 * 200}px) rotate(${n2 * 270}deg) scale(${
      3 + n1 * 2
    }, ${3 + n2 * 2})`,
  };
  Object.assign(svg.style, style);
  content.appendChild(svg);
}
const Svgs = document.querySelectorAll(".svg");

/*------------------------------
Init ScrollSmoother
------------------------------*/
const scrollerSmoother = ScrollSmoother.create({
  content: content,
  wrapper: "#wrapper",
  smooth: 1,
  effects: false,
});

/*------------------------------
Scroll Trigger
------------------------------*/
const main = gsap.timeline({
  scrollTrigger: {
    scrub: 0.7,
    start: "top 40%",
    end: "bottom bottom",
  },
});
Svgs.forEach((svg) => {
  main.to(svg, {
    opacity: 1,
  });
});
