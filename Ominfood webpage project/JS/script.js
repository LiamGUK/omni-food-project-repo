console.info("JS sheet connected");

///////////////////////////////////////////////////////////
// Automated Year update for footer

const yearEl = document.querySelector(".year"); // targets the span tags wrapping year text in html footer
const currentYear = new Date().getFullYear(); // Grabs current year based on timestamp grabbed from Date function.
yearEl.textContent = currentYear; // year value from getFullYear method replaces text content from HTML with current year.

// Make mobile burger menu button work
const btnNavEl = document.querySelector(".btn-mobile-nav"); // targets button element holding both svg images for mobile menu
const headerEl = document.querySelector(".header"); // targets header wrapping all navigation elements in HTML

// click event function that toggles adding nav-open class if not present or removing if added to HTML - class changes the css to show mobile menu when function is executed.
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link"); // targets all anchor elements with a href attribute in HTML doc
console.log(allLinks);

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    console.log(e); // logs event fired when clicking on link element in nodelist
    e.preventDefault(); // prevents default action happening on element when clicked - this case jumps to linked location.
    const href = link.getAttribute("href"); // grabs the href attribute from link when clicked on it.
    console.log(href);

    // scroll back to top of page
    if (href === "#")
      // if href attribute value is just # then to just scroll to top of the page (0) with a smooth scroll
      window.scrollTo({
        top: 0, // 0 = Y offset position on page - 0 = top of the page
        behavior: "smooth",
      });

    // Scroll to other links on page with smooth scrolling
    if (href !== "#" && href.startsWith("#")) {
      const sectionEL = document.querySelector(href);
      sectionEL.scrollIntoView({ behavior: "smooth" }); // scrollIntoView method scrolls specified element into the visible area of page - in this case the id attribute grabbed from href variable on clicked element
    }

    // close mobile navigation menu if open
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky Navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0]; // targets 1st entry in entries array
    console.log(ent);
    if (ent.isIntersecting === false) document.body.classList.add("sticky");
    if (ent.isIntersecting === true) document.body.classList.remove("sticky");
  },
  {
    root: null, // observe the hero-section inside the viewport
    threshold: 0, // will fire when 0% of hero section is inside the viewport - will only fire function once the hero-section has moved outside of the viewport view and scrolled down page.
    rootMargin: "-80px", // subtracts 80px off of the threshold to allow 80px height of navigation bar - sticky effect is applied a bit sooner to prevent certain elements getting covered by navigation on scroll.
  }
);
obs.observe(sectionHeroEl); // Observe a specific html element in the DOM - this case the section-hero in HTML

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
