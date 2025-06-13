/*------------------------------
Register plugins
------------------------------*/
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const content = document.querySelector("#content");

/*------------------------------
Making some infinity SVGs noise
------------------------------*/
const simplex = new SimplexNoise();
for (let i = 0; i < 5000; i++) {
  const img = document.createElement("img");
  img.src = "infinity.svg";
  img.classList.add("infinity");
  const n1 = simplex.noise2D(i * 0.003, i * 0.0033);
  const n2 = simplex.noise2D(i * 0.002, i * 0.001);

  const style = {
    transform: `translate(${n2 * 200}px, ${n1 * 200}px) rotate(${
      n2 * 270
    }deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
    opacity: 0,
    position: "absolute",
    width: "20px",
    height: "20px",
  };
  Object.assign(img.style, style);
  content.appendChild(img);
}
const Infinities = document.querySelectorAll(".infinity");

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
    start: "top 25%",
    end: "bottom bottom",
  },
});
Infinities.forEach((infinity) => {
  main.to(infinity, {
    opacity: 0.6,
  });
});
