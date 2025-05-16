// Call updateContent() on page load
window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("lang") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);

  const langBtn = document.querySelector("#langBtn");
  langBtn.setAttribute("class", userPreferredLanguage);
});

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.innerHTML = langData[key];
  });
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem("lang", lang);
  location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`lang/${lang}.json`);
  return response.json();
}

// Function to change language
async function changeLanguage(lang) {
  await setLanguagePreference(lang);

  const langData = await fetchLanguageData(lang);
  updateContent(langData);

  const langBtn = document.querySelector("#langBtn");
  langBtn.setAttribute("class", lang);
}
