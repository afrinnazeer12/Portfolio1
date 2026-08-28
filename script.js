const text = "Software Engineer";
const element = document.getElementById("animatedRole");

let index = 0;
let isDeleting = false;
let speed = 100;

function typeLoop() {
  if (!isDeleting) {
    // Typing
    element.innerHTML = text.substring(0, index + 1);
    index++;

    if (index === text.length) {
      setTimeout(() => isDeleting = true, 1000); // wait before deleting
    }
  } else {
    // Deleting
    element.innerHTML = text.substring(0, index - 1);
    index--;

    if (index === 0) {
      isDeleting = false;
    }
  }

  setTimeout(typeLoop, isDeleting ? 50 : speed);
}

typeLoop();

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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applySkillSymbols);
} else {
  applySkillSymbols();
}



function initializeNavigation() {
  document.querySelector(".header__links").classList.add("show-nav");

  const menuButton = document.querySelector(".header__main-ham-menu");
  const mobileMenu = document.querySelector(".header__sm-menu");
  const closeButton = document.querySelector(".header__sm-menu-close");

  if (menuButton && mobileMenu) {
    function closeMobileMenu() {
      mobileMenu.classList.remove("header__sm-menu--active");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }

    menuButton.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.toggle("header__sm-menu--active");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    if (closeButton) {
      closeButton.addEventListener("click", closeMobileMenu);
    }

    // Close main menu for all nav links
    mobileMenu.querySelectorAll(".header__sm-menu-link a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeNavigation);
} else {
  initializeNavigation();
}

//Animate the linkedin like lins
window.addEventListener("load", function () {

  const socials = document.querySelectorAll(".home-hero__social");

  socials.forEach((icon, index) => {

    // Start completely off-screen left
    icon.style.position = "relative";
    icon.style.left = "-120px";
    icon.style.opacity = "0";

    setTimeout(() => {

      let leftPosition = -120;
      let opacity = 0;

      const animate = setInterval(() => {

        leftPosition += 6;   // move right
        opacity += 0.05;

        icon.style.left = leftPosition + "px";
        icon.style.opacity = opacity;

        if (leftPosition >= 0) {
          icon.style.left = "0px";
          icon.style.opacity = "1";
          clearInterval(animate);
        }

      }, 20);

    }, 1200 + (index * 200)); // stagger effect

  });

});



// Animate the text and resume button on page load
window.addEventListener("load", function () {

  const text = document.getElementById("animatedText");

  // Initial state
  text.style.transform = "translateY(60px) scale(0.95)";
  text.style.opacity = "0";

  setTimeout(() => {

    let position = 60;
    let opacity = 0;
    let scale = 0.95;

    const animate = setInterval(() => {

      position -= 2.5;
      opacity += 0.04;
      scale += 0.002;

      text.style.transform = `translateY(${position}px) scale(${scale})`;
      text.style.opacity = opacity;

      if (position <= 0) {
        text.style.transform = "translateY(0px) scale(1)";
        text.style.opacity = "1";
        clearInterval(animate);
      }

    }, 20);

  }, 500); // appears before resume button

});














window.addEventListener("load", function () {

  const button = document.getElementById("resumeBtn");

  // Start lower and slightly small
  button.style.transform = "translateY(60px) scale(0.9)";
  button.style.opacity = "0";

  setTimeout(() => {

    let position = 60;   // start lower
    let opacity = 0;
    let scale = 0.9;

    const animate = setInterval(() => {

      position -= 2.5;   // move faster upward
      opacity += 0.05;
      scale += 0.005;

      button.style.transform = `translateY(${position}px) scale(${scale})`;
      button.style.opacity = opacity;

      if (position <= -10) {  // final position little upper
        button.style.transform = "translateY(-10px) scale(1)";
        button.style.opacity = "1";
        clearInterval(animate);
      }

    }, 20);

  }, 1000);

});




document.addEventListener("DOMContentLoaded", function () {
  // Keep About heading static/visible (no scroll animation).
  const aboutHeading = document.getElementById("aboutHeading");
  if (aboutHeading) {
    aboutHeading.style.transform = "none";
    aboutHeading.style.opacity = "1";
  }
});





document.addEventListener("DOMContentLoaded", function () {
  // Keep About + Skills block static/visible (no hide/show on scroll).
  const aboutSection = document.getElementById("aboutSection");
  if (aboutSection) {
    aboutSection.style.transform = "none";
    aboutSection.style.opacity = "1";
    aboutSection.style.transition = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const aboutContactBtn = document.getElementById("aboutContactBtn");
  const contactSection = document.getElementById("contact");
  const contactPopup = document.getElementById("contactPopup");
  const contactPopupGo = document.getElementById("contactPopupGo");
  const contactPopupCancel = document.getElementById("contactPopupCancel");

  if (!aboutContactBtn || !contactSection || !contactPopup || !contactPopupGo || !contactPopupCancel) {
    return;
  }

  function closeContactPopup() {
    contactPopup.classList.remove("contact-popup--open");
    contactPopup.setAttribute("aria-hidden", "true");
  }

  function openContactPopup() {
    contactPopup.classList.add("contact-popup--open");
    contactPopup.setAttribute("aria-hidden", "false");
  }

  aboutContactBtn.addEventListener("click", function (event) {
    event.preventDefault();
    openContactPopup();
  });

  contactPopupGo.addEventListener("click", function () {
    closeContactPopup();
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    contactSection.classList.remove("contact--focus");
    setTimeout(() => {
      contactSection.classList.add("contact--focus");
    }, 250);
  });

  contactPopupCancel.addEventListener("click", closeContactPopup);

  contactPopup.addEventListener("click", function (event) {
    if (event.target === contactPopup) {
      closeContactPopup();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeContactPopup();
    }
  });
});




document.addEventListener("DOMContentLoaded", function () {

  const projectsHeading = document.getElementById("projectsHeading");

  // Initial state (hidden from left)
  projectsHeading.style.transform = "translateX(-150px)";
  projectsHeading.style.opacity = "0";
  projectsHeading.style.transition = "all 1.2s ease";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        projectsHeading.style.transform = "translateX(0)";
        projectsHeading.style.opacity = "1";
      } else {
        projectsHeading.style.transform = "translateX(-150px)";
        projectsHeading.style.opacity = "0";
      }

    });
  }, { threshold: 0.3 }); // appears when 30% visible

  observer.observe(projectsHeading);

});









document.addEventListener("DOMContentLoaded", function () {

  const projectRows = document.querySelectorAll(".projects__row");

  // Initial hidden state
  projectRows.forEach((row) => {
    row.style.transform = "translateX(-100px)";
    row.style.opacity = "0";
    row.style.transition = "all 1s ease";
  });

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        const index = Array.from(projectRows).indexOf(entry.target);

        setTimeout(() => {
          entry.target.style.transform = "translateX(0)";
          entry.target.style.opacity = "1";
        }, index * 300); // one-by-one effect

      } else {

        entry.target.style.transform = "translateX(-100px)";
        entry.target.style.opacity = "0";

      }

    });

  }, { threshold: 0.20 }); // ✅ 20% visible

  projectRows.forEach((row) => {
    observer.observe(row);
  });

});


document.addEventListener("DOMContentLoaded", function () {

  const projectsHeading = document.getElementById("projectsHeading");
  const contactHeading = document.querySelector(".heading-sec__main.heading-sec__main--lt");

  // Function to initialize animation
  function initSlideInAnimation(element) {
    // Initial state (hidden from left)
    element.style.transform = "translateX(-150px)";
    element.style.opacity = "0";
    element.style.transition = "all 1.2s ease";

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.style.transform = "translateX(0)";
          element.style.opacity = "1";
        } else {
          element.style.transform = "translateX(-150px)";
          element.style.opacity = "0";
        }
      });
    }, { threshold: 0.3 });

    observer.observe(element);
  }

  // Apply animation to both elements
  initSlideInAnimation(projectsHeading);
  initSlideInAnimation(contactHeading);

});




// ===== Animate Input Focus =====
const inputs = document.querySelectorAll(".contact__form-input");
const contactForm = document.querySelector(".contact__form");
const contactStatus = document.querySelector(".contact__form-status");
const contactResponse = document.querySelector(".contact__form-response");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

if (emailInput && emailError) {
  function validateEmail() {
    emailError.textContent = emailInput.validity.typeMismatch ? "Enter a valid email ID." : "";
  }

  emailInput.addEventListener("invalid", validateEmail);
  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", () => {
    if (emailInput.validity.valid) {
      emailError.textContent = "";
    }
  });
}

if (contactForm && contactStatus && contactResponse) {
  let isSubmitting = false;
  let statusTimer;

  function hideContactStatus() {
    contactStatus.textContent = "";
    contactStatus.classList.remove("contact__form-status--visible");
  }

  contactForm.addEventListener("submit", () => {
    isSubmitting = true;
    contactStatus.classList.add("contact__form-status--visible");
    contactStatus.textContent = "Sending...";
    clearTimeout(statusTimer);
    statusTimer = setTimeout(hideContactStatus, 8000);
  });

  contactResponse.addEventListener("load", () => {
    if (!isSubmitting) {
      return;
    }

    isSubmitting = false;
    contactForm.reset();
    contactStatus.classList.add("contact__form-status--visible");
    contactStatus.textContent = "Thank you for contacting me. I will connect soon.";
  });
}

inputs.forEach(input => {
  input.addEventListener("focus", () => {
    input.style.transition = "all 0.3s ease";
    input.style.border = "2px solid #FFFFFF";
    input.style.boxShadow = "0 0 10px rgba(0, 170, 255, 0.5)";
  });
  input.addEventListener("blur", () => {
    input.style.border = "";
    input.style.boxShadow = "";
  });
});

// ===== Animate Button Hover =====
const button = document.querySelector(".contact__btn");

button.addEventListener("mouseenter", () => {
  button.style.transition = "all 0.3s ease";
  button.style.transform = "scale(1.05)";
  button.style.backgroundColor = "#000000";
  button.style.cursor = "pointer";
});

button.addEventListener("mouseleave", () => {
  button.style.transform = "";
  button.style.backgroundColor = "";
});

// ===== Animate Footer Social Icons =====
const icons = document.querySelectorAll(".main-footer__icon");

icons.forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    icon.style.transition = "all 0.3s ease";
    icon.style.transform = "scale(1.2) rotate(10deg)";
    icon.style.filter = "drop-shadow(0 0 5px #00aaff)";
  });
  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "";
    icon.style.filter = "";
  });
});

// ===== Fade-in on Scroll with different speeds =====
const formContainer = document.querySelector(".contact__form-container");
const footer = document.querySelector(".main-footer");
const footerText = footer.querySelector("h2");

// Initialize fade state
formContainer.style.opacity = 0;
formContainer.style.transform = "translateY(50px)";

footer.style.opacity = 0;
footer.style.transform = "translateY(50px)";

footerText.style.opacity = 0;
footerText.style.transform = "translateY(50px)";

icons.forEach(icon => {
  icon.style.opacity = 0;
  icon.style.transform = "translateY(50px)";
});

function fadeInOnScroll() {
  const windowBottom = window.innerHeight + window.scrollY;

  // Form - normal speed
  const formTop = formContainer.getBoundingClientRect().top + window.scrollY;
  if(windowBottom > formTop + 100){
    formContainer.style.transition = "all 0.8s ease-out";
    formContainer.style.opacity = 1;
    formContainer.style.transform = "translateY(0)";
  }

  // Footer - faster
  const footerTop = footer.getBoundingClientRect().top + window.scrollY;
  if(windowBottom > footerTop + 50){ // trigger sooner
    footer.style.transition = "all 0.5s ease-out";
    footer.style.opacity = 1;
    footer.style.transform = "translateY(0)";
  }

  // Footer text - even faster
  const textTop = footerText.getBoundingClientRect().top + window.scrollY;
  if(windowBottom > textTop + 20){
    footerText.style.transition = "all 0.4s ease-out";
    footerText.style.opacity = 1;
    footerText.style.transform = "translateY(0)";
  }

  // Icons - slightly staggered and fast
  icons.forEach((icon, index) => {
    const iconTop = icon.getBoundingClientRect().top + window.scrollY;
    if(windowBottom > iconTop + 20){
      setTimeout(() => { // stagger effect
        icon.style.transition = "all 0.4s ease-out";
        icon.style.opacity = 1;
        icon.style.transform = "translateY(0)";
      }, index * 100); // 0.1s delay per icon
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll(); // trigger once on load