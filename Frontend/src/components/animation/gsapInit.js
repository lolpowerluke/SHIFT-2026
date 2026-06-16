// Central place that loads GSAP + its plugins once for the whole app.
// Everything animation-related imports gsap/ScrollTrigger from here so the
// plugin is only ever registered a single time.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// iOS Safari shows/hides its address bar while scrolling, which resizes the
// viewport and makes ScrollTrigger recalc mid-scroll → stutter. Ignoring that
// resize keeps scrolling smooth on iPhone. `fastScrollEnd` also helps on mobile.
ScrollTrigger.config({ ignoreMobileResize: true, fastScrollEnd: true });

export { gsap, ScrollTrigger };
