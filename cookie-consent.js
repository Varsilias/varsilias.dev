(function () {
  var key = "varsilias_cookie_consent";
  var grantedValue = "granted";
  var deniedValue = "denied";

  function getConsent() {
    try {
      return window.localStorage.getItem(key);
    } catch (_error) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (_error) {
      return;
    }
  }

  function removeElement(id) {
    var element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }

  function showPreferencesButton() {
    if (document.getElementById("varsilias-cookie-preferences")) {
      return;
    }

    var wrapper = document.createElement("div");
    wrapper.id = "varsilias-cookie-preferences";
    wrapper.className = "varsilias-cookie-preferences";
    wrapper.innerHTML = '<button type="button">Cookie preferences</button>';

    wrapper.querySelector("button").addEventListener("click", function () {
      removeElement("varsilias-cookie-preferences");
      showBanner(true);
    });

    document.body.appendChild(wrapper);
  }

  function showBanner(isPreferenceChange) {
    if (document.getElementById("varsilias-cookie-banner")) {
      return;
    }

    var banner = document.createElement("section");
    banner.id = "varsilias-cookie-banner";
    banner.className = "varsilias-cookie-banner";
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = [
      '<h2 class="varsilias-cookie-title">Analytics preferences</h2>',
      '<p class="varsilias-cookie-copy">',
      "Varsilias.dev uses Google Analytics to understand which docs are useful. ",
      "No ads, remarketing, or fingerprinting are used. You can reject analytics and keep using the site normally.",
      "</p>",
      '<div class="varsilias-cookie-actions">',
      '<button type="button" class="varsilias-cookie-button varsilias-cookie-reject" data-consent="denied">Reject analytics</button>',
      '<button type="button" class="varsilias-cookie-button varsilias-cookie-accept" data-consent="granted">Allow analytics</button>',
      "</div>"
    ].join("");

    banner.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.getAttribute) {
        return;
      }

      var consent = target.getAttribute("data-consent");
      if (!consent) {
        return;
      }

      setConsent(consent === "granted" ? grantedValue : deniedValue);
      removeElement("varsilias-cookie-banner");
      showPreferencesButton();

      if (consent === "granted" || isPreferenceChange) {
        window.location.reload();
      }
    });

    document.body.appendChild(banner);
  }

  function init() {
    var consent = getConsent();

    if (consent === grantedValue || consent === deniedValue) {
      showPreferencesButton();
      return;
    }

    showBanner(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
