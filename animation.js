document.addEventListener("DOMContentLoaded", function () {

  const SKILL_ICON_MAP = {
    "JAVA": "logos:java",
    "SPRING": "logos:spring-icon",
    "SPRING BOOT": "logos:spring-icon",
    "KARATE": "mdi:test-tube",
    "KARATE FRAMEWORK (API TESTING)": "mdi:test-tube",
    "AWS": "logos:aws",
    "MYSQL": "logos:mysql",
    "GIT": "logos:git-icon",
    "GITHUB": "logos:github-icon",
    "POSTMAN": "logos:postman-icon",
    "JIRA": "logos:jira",
    "VS CODE": "logos:visual-studio-code",
    "INTELLIJ": "logos:intellij-idea",
    "ECLIPSE": "logos:eclipse-icon",
    "KIBANA": "logos:kibana",
    "GRAFANA": "logos:grafana",
    "CI/CD": "mdi:source-branch-sync",
    "HTML": "logos:html-5",
    "CSS": "logos:css-3",
    "JAVASCRIPT": "logos:javascript",
    "REACT": "logos:react",
    "PYTHON": "logos:python",
    "REST APIS": "mdi:api",
    "MICROSERVICES": "mdi:cube-outline",
    "AGILE": "mdi:run-fast"
  };

  function applySkillSymbols() {
    document.querySelectorAll(".skills__skill").forEach((skill) => {
      const label = (skill.dataset.skillName || skill.textContent).trim();
      const iconName = SKILL_ICON_MAP[label.toUpperCase()];

      if (!iconName) {
        return;
      }

      if (skill.dataset.symbolApplied !== "true") {
        skill.dataset.symbolApplied = "true";
        skill.classList.add("skills__skill--icon");
        skill.setAttribute("title", label);
        skill.setAttribute("aria-label", label);
        skill.dataset.skillName = label;
        skill.innerHTML = `<iconify-icon icon="${iconName}" aria-hidden="true"></iconify-icon>`;
      }

      if (skill.dataset.nameInteractionBound !== "true") {
        skill.dataset.nameInteractionBound = "true";
        skill.tabIndex = 0;
        skill.setAttribute("role", "button");

        const showSkillName = () => {
          document.querySelectorAll(".skills__skill--show-name").forEach((item) => {
            if (item !== skill) {
              item.classList.remove("skills__skill--show-name");
            }
          });

          skill.classList.add("skills__skill--show-name");
          clearTimeout(skill._hideNameTimer);
          skill._hideNameTimer = setTimeout(() => {
            skill.classList.remove("skills__skill--show-name");
          }, 1700);
        };

        skill.addEventListener("click", showSkillName);
        skill.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showSkillName();
          }
        });
      }
    });
  }

  applySkillSymbols();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealOnScroll(selector, {
    distance = 26,
    direction = "up",
    duration = 0.85,
    stagger = 0,
    threshold = 0.25,
    rootMargin = "0px 0px -10% 0px"
  } = {}) {
    const elements = document.querySelectorAll(selector);

    if (!elements.length) {
      return;
    }

    elements.forEach((element, index) => {
      if (prefersReducedMotion) {
        element.style.opacity = "1";
        element.style.transform = "none";
        element.style.filter = "none";
        return;
      }

      const axisTransform = direction === "left"
        ? `translateX(-${distance}px)`
        : direction === "right"
          ? `translateX(${distance}px)`
          : `translateY(${distance}px)`;

      element.style.opacity = "0";
      element.style.transform = axisTransform;
      element.style.filter = "blur(6px)";
      element.style.transition = `opacity ${duration}s ease ${index * stagger}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${index * stagger}s, filter ${duration}s ease ${index * stagger}s`;

      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.filter = "none";
            observerInstance.unobserve(element);
          }
        });
      }, { threshold, rootMargin });

      observer.observe(element);
    });
  }

  function animateText(selector, {
    mode = "words",
    stagger = 45,
    threshold = 0.2,
    rootMargin = "0px 0px -8% 0px"
  } = {}) {
    const elements = document.querySelectorAll(selector);

    if (!elements.length) {
      return;
    }

    elements.forEach((element) => {
      if (element.dataset.textAnimated === "true") {
        return;
      }

      element.dataset.textAnimated = "true";

      const originalText = element.textContent;
      const parts = mode === "chars" ? Array.from(originalText) : originalText.split(/(\s+)/);
      const spans = [];

      element.textContent = "";

      parts.forEach((part) => {
        if (mode === "chars") {
          const span = document.createElement("span");
          span.className = "project-title-char";
          span.textContent = part === " " ? "\u00A0" : part;
          element.appendChild(span);
          spans.push(span);
          return;
        }

        if (/^\s+$/.test(part)) {
          element.appendChild(document.createTextNode(part));
          return;
        }

        const span = document.createElement("span");
        span.className = "project-text-word";
        span.textContent = part;
        element.appendChild(span);
        spans.push(span);
      });

      if (prefersReducedMotion) {
        spans.forEach(span => {
          span.classList.add(mode === "chars" ? "project-title-char--in" : "project-text-word--in");
          span.style.transition = "none";
        });
        return;
      }

      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            spans.forEach((span, index) => {
              setTimeout(() => {
                span.classList.add(mode === "chars" ? "project-title-char--in" : "project-text-word--in");
              }, index * stagger);
            });
            observerInstance.unobserve(element);
          }
        });
      }, { threshold, rootMargin });

      observer.observe(element);
    });
  }

  const roleElement = document.getElementById("animatedRole");

  if (roleElement) {
    const text = "Software Engineer";
    let index = 0;
    let isDeleting = false;

    function typeLoop() {
      if (!isDeleting) {
        roleElement.innerHTML = text.substring(0, index + 1);
        index++;
        if (index === text.length) {
          setTimeout(() => isDeleting = true, 800);
        }
      } else {
        roleElement.innerHTML = text.substring(0, index - 1);
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
      setTimeout(typeLoop, isDeleting ? 40 : 80);
    }

    typeLoop();
  }

  const projectTyping = document.getElementById("typing-text");

  if (projectTyping) {
    const text = projectTyping.textContent.trim();
    let index = 0;
    let isDeleting = false;

    projectTyping.textContent = "";

    function typeLoopProject() {
      if (!isDeleting) {
        projectTyping.innerHTML = text.substring(0, index + 1);
        index++;
        if (index === text.length) {
          setTimeout(() => isDeleting = true, 800);
        }
      } else {
        projectTyping.innerHTML = text.substring(0, index - 1);
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
      setTimeout(typeLoopProject, isDeleting ? 40 : 80);
    }

    typeLoopProject();
  }


  const navLinks = document.querySelector(".header__links");
  if (navLinks) {
    navLinks.classList.add("show-nav");
  }

  const projectsToggle = document.querySelector(".header__link--projects");
  const projectsMenu = document.querySelector(".header__projects-menu");

  if (projectsToggle && projectsMenu) {
    projectsToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = projectsMenu.classList.toggle("header__projects-menu--open");
      projectsToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!projectsMenu.contains(event.target) && !projectsToggle.contains(event.target)) {
        projectsMenu.classList.remove("header__projects-menu--open");
        projectsToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const smProjectsToggle = document.querySelector(".header__sm-projects-toggle");
  const smProjectsMenu = document.querySelector(".header__sm-projects-menu");

  if (smProjectsToggle && smProjectsMenu) {
    smProjectsToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = smProjectsMenu.classList.toggle("header__sm-projects-menu--open");
      smProjectsToggle.setAttribute("aria-expanded", String(isOpen));
    });

    smProjectsMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        smProjectsMenu.classList.remove("header__sm-projects-menu--open");
        smProjectsToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const socials = document.querySelectorAll(".home-hero__social");

  if (socials.length > 0) {
    socials.forEach((icon, index) => {

      icon.style.position = "relative";
      icon.style.left = "-150px";
      icon.style.opacity = "0";

      setTimeout(() => {

        let leftPosition = -150;
        let opacity = 0;

        const animate = setInterval(() => {

          leftPosition += 15;   // 🔥 Increased speed
          opacity += 0.1;       // 🔥 Faster fade

          icon.style.left = leftPosition + "px";
          icon.style.opacity = opacity;

          if (leftPosition >= 0) {
            icon.style.left = "0px";
            icon.style.opacity = "1";
            clearInterval(animate);
          }

        }, 10); // 🔥 Reduced interval time

      }, 800 + (index * 150));

    });
  }

  const projectHero = document.querySelector(".project-cs-hero");

  const homeHero = document.querySelector(".home-hero");

  if (homeHero) {
    revealOnScroll(".home-hero .heading-primary", {
      direction: "up",
      distance: 26,
      duration: 0.95,
      threshold: 0.08,
      rootMargin: "0px 0px -5% 0px"
    });

    animateText(".home-hero__info p", {
      mode: "words",
      stagger: 34,
      threshold: 0.08,
      rootMargin: "0px 0px -5% 0px"
    });

    revealOnScroll("#resumeBtn", {
      direction: "up",
      distance: 22,
      duration: 0.8,
      threshold: 0.08,
      rootMargin: "0px 0px -5% 0px"
    });
  }

  if (projectHero) {
    revealOnScroll(".project-cs-hero__content", {
      direction: "up",
      distance: 28,
      duration: 0.95,
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px"
    });

    animateText(".project-cs-hero .heading-primary", {
      mode: "chars",
      stagger: 30,
      threshold: 0.12,
      rootMargin: "0px 0px -5% 0px"
    });

    animateText(".project-cs-hero__info p", {
      mode: "words",
      stagger: 40,
      threshold: 0.12,
      rootMargin: "0px 0px -5% 0px"
    });

    revealOnScroll(".project-cs-hero__cta", {
      direction: "up",
      distance: 22,
      duration: 0.8,
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px"
    });

    revealOnScroll(".tech-orbit", {
      direction: "left",
      distance: 30,
      duration: 0.9,
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px"
    });

    revealOnScroll(".tech-orbit__badge", {
      direction: "up",
      distance: 18,
      duration: 0.6,
      stagger: 0.08,
      threshold: 0.12,
      rootMargin: "0px 0px -5% 0px"
    });

    revealOnScroll(".project-details__content-title", {
      direction: "up",
      distance: 20,
      duration: 0.8,
      threshold: 0.25,
      rootMargin: "0px 0px -10% 0px"
    });

    revealOnScroll(".project-details__showcase-img-cont", {
      direction: "right",
      distance: 30,
      duration: 0.95,
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });

    revealOnScroll(".project-details__desc-para", {
      direction: "up",
      distance: 18,
      duration: 0.75,
      stagger: 0.12,
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });

    animateText(".project-details__tools-note", {
      mode: "words",
      stagger: 30,
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });

    revealOnScroll(".project-details__tools-used", {
      direction: "up",
      distance: 24,
      duration: 0.85,
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });

    revealOnScroll(".project-details__tools-used .skills__skill", {
      direction: "up",
      distance: 14,
      duration: 0.55,
      stagger: 0.05,
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });

    revealOnScroll(".project-runtime", {
      direction: "up",
      distance: 30,
      duration: 0.85,
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    });

    revealOnScroll(".project-runtime__error", {
      direction: "left",
      distance: 20,
      duration: 0.65,
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    });

    revealOnScroll(".project-details__links-btn", {
      direction: "up",
      distance: 18,
      duration: 0.7,
      stagger: 0.08,
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });
  }

  // =====================================
  // Reusable Slide In Animation
  // =====================================
  function slideInOnScroll(selector, distance = -150) {

    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {

      element.style.transform = `translateX(${distance}px)`;
      element.style.opacity = "0";
      element.style.transition = "all 0.7s ease";

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.style.transform = "translateX(0)";
            element.style.opacity = "1";
          }
        });
      }, { threshold: 0.3 });

      observer.observe(element);
    });
  }

  slideInOnScroll("#aboutHeading");
  slideInOnScroll("#aboutSection");
  slideInOnScroll("#projectsHeading");
  slideInOnScroll(".projects__row");
  slideInOnScroll("#educationHeading");

  if (document.querySelector(".education__content")) {
    revealOnScroll(".education__card", {
      direction: "up",
      distance: 24,
      duration: 0.8,
      stagger: 0.12,
      threshold: 0.22,
      rootMargin: "0px 0px -10% 0px"
    });

    animateText(".education__institution, .education__meta", {
      mode: "words",
      stagger: 26,
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px"
    });
  }


  const overviewText = document.querySelector(".project-details__desc-para");

  if (overviewText) {

    overviewText.style.opacity = "0";
    overviewText.style.transform = "translateX(-60px)";
    overviewText.style.transition = "all 0.6s ease";

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          overviewText.style.opacity = "1";
          overviewText.style.transform = "translateX(0)";
        }
      });
    }, { threshold: 0.3 });

    observer.observe(overviewText);
  }


  const skills = document.querySelectorAll(".skills__skill");

  if (skills.length > 0) {

    skills.forEach(skill => {
      skill.style.opacity = "0";
      skill.style.transform = "translateY(30px)";
      skill.style.transition = "all 0.4s ease";
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {

          skills.forEach((skill, index) => {
            setTimeout(() => {
              skill.style.opacity = "1";
              skill.style.transform = "translateY(0)";
            }, index * 100);
          });

        }

      });
    }, { threshold: 0.3 });

    observer.observe(skills[0]);
  }

 


  const inputs = document.querySelectorAll(".contact__form-input");

  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      input.style.border = "2px solid #00aaff";
      input.style.boxShadow = "0 0 8px rgba(0,170,255,0.5)";
    });

    input.addEventListener("blur", () => {
      input.style.border = "";
      input.style.boxShadow = "";
    });
  });


  // Footer Fade Animation

  const footer = document.querySelector(".main-footer");

  if (footer) {
    footer.style.opacity = 0;
    footer.style.transform = "translateY(50px)";
    footer.style.transition = "all 0.6s ease";

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.style.opacity = 1;
          footer.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.2 });

    observer.observe(footer);
  }

});

function setupProjectNavigation() {
  const menuButton = document.querySelector(".header__main-ham-menu");
  const mobileMenu = document.querySelector(".header__sm-menu");
  const closeButton = document.querySelector(".header__sm-menu-close");

  if (!menuButton || !mobileMenu || menuButton.dataset.navigationReady) {
    return;
  }

  menuButton.dataset.navigationReady = "true";

  function closeMenu() {
    mobileMenu.classList.remove("header__sm-menu--active");
    mobileMenu.style.removeProperty("visibility");
    mobileMenu.style.removeProperty("opacity");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }

  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("header__sm-menu--active");
    if (isOpen) {
      mobileMenu.style.setProperty("visibility", "visible", "important");
      mobileMenu.style.setProperty("opacity", "1", "important");
    } else {
      mobileMenu.style.removeProperty("visibility");
      mobileMenu.style.removeProperty("opacity");
    }
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  closeButton?.addEventListener("click", closeMenu);
  // Close menu for all links EXCEPT the Projects toggle
  mobileMenu.querySelectorAll(".header__sm-menu-link a:not(.header__sm-projects-toggle)").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupProjectNavigation);
} else {
  setupProjectNavigation();
}


