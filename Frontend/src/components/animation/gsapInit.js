// Central place that loads GSAP + its plugins once for the whole app.
// Everything animation-related imports gsap/ScrollTrigger from here so the
// plugin is only ever registered a single time.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
