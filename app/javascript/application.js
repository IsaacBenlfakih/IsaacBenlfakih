const initializeParallax = () => {
  const heroArt = document.querySelector(".hero-art")
  const parallaxText = [...document.querySelectorAll("main h1, main h2, main h3, main p, main .section-label, main .arrow-link, main .text-link, main .contact-email, main .site-footer")]
  const scrollRevealElements = [...document.querySelectorAll(".about > *, .work > *, .project, .contact > *, .site-footer")]
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if ((!heroArt && !parallaxText.length) || prefersReducedMotion) return

  scrollRevealElements.forEach((element, index) => {
    element.classList.add("scroll-fade")
    element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`)
  })

  if (scrollRevealElements.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: "0px 0px 6%", threshold: 0.08 })

    scrollRevealElements.forEach((element) => revealObserver.observe(element))
  } else {
    scrollRevealElements.forEach((element) => element.classList.add("is-visible"))
  }

  parallaxText.forEach((element, index) => {
    element.dataset.parallaxSpeed = index % 3 === 0 ? "0.03" : index % 3 === 1 ? "0.02" : "0.014"
  })

  const textMeasurements = parallaxText.map((element) => ({
    element,
    top: element.getBoundingClientRect().top + window.scrollY,
    height: element.offsetHeight,
    speed: Number(element.dataset.parallaxSpeed)
  }))
  const heroMeasurement = heroArt && {
    top: heroArt.getBoundingClientRect().top + window.scrollY,
    height: heroArt.offsetHeight
  }

  let frameRequested = false

  const updateParallax = () => {
    if (heroArt) {
      const distanceFromCenter = heroMeasurement.top - window.scrollY + heroMeasurement.height / 2 - window.innerHeight / 2
      const offset = Math.max(-36, Math.min(36, distanceFromCenter * -0.08))
      heroArt.style.setProperty("--parallax-y", `${offset}px`)
    }

    textMeasurements.forEach(({ element, top, height, speed }) => {
      const distanceFromCenter = top - window.scrollY + height / 2 - window.innerHeight / 2
      const offset = Math.max(-28, Math.min(28, distanceFromCenter * -speed))
      element.style.setProperty("--text-parallax-y", `${offset}px`)
    })

    frameRequested = false
  }

  const requestParallaxUpdate = () => {
    if (!frameRequested) {
      window.requestAnimationFrame(updateParallax)
      frameRequested = true
    }
  }

  updateParallax()
  window.addEventListener("scroll", requestParallaxUpdate, { passive: true })
  document.addEventListener("scroll", requestParallaxUpdate, { passive: true, capture: true })
  window.addEventListener("resize", requestParallaxUpdate)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeParallax, { once: true })
} else {
  initializeParallax()
}
