document.addEventListener("DOMContentLoaded", function () {
  var year = document.getElementById("footer-year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Phone menu: the menu button shows and hides the nav links
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) {
    return;
  }

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
});

// Report outbound link clicks to Google Analytics
document.addEventListener("click", function (event) {
  var link = event.target.closest("a[href]");
  if (!link) {
    return;
  }

  var href = link.getAttribute("href");
  if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0) {
    return;
  }

  // Skip navigation between pages of this site, but keep tracking the CV PDF.
  var isExternal = link.hostname !== window.location.hostname;
  var isPdf = /\.pdf$/i.test(link.pathname);
  if (!isExternal && !isPdf) {
    return;
  }

  if (typeof gtag === "function") {
    gtag("event", "click", {
      event_category: "outbound",
      event_label: link.href,
      transport_type: "beacon"
    });
  }
});
