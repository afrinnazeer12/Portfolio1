document.addEventListener("DOMContentLoaded", function () {

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

  const heroText = document.querySelector(".project-cs-hero__info");

  if (heroText) {
    heroText.style.opacity = "0";
    heroText.style.transform = "translateY(40px)";
    heroText.style.transition = "all 0.6s ease";

    setTimeout(() => {
      heroText.style.opacity = "1";
      heroText.style.transform = "translateY(0)";
    }, 300);
  }

 
  const resumeBtn = document.getElementById("resumeBtn");

  if (resumeBtn) {
    resumeBtn.style.transform = "translateY(60px)";
    resumeBtn.style.opacity = "0";

    setTimeout(() => {
      resumeBtn.style.transition = "all 0.5s ease";
      resumeBtn.style.transform = "translateY(0)";
      resumeBtn.style.opacity = "1";
    }, 600);
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
  mobileMenu.querySelectorAll(".header__sm-menu-link a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupProjectNavigation);
} else {
  setupProjectNavigation();
}

