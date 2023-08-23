function toggleDarkMode() {
  const body = document.querySelector("body");
  const moonIcon = document.querySelector(".dark-mode-button i");

  body.classList.toggle("dark-mode");

  // İkonun durumuna göre sınıfını güncelle
  if (body.classList.contains("dark-mode")) {
    moonIcon.classList.remove("fa-moon");
    moonIcon.classList.add("fa-sun");
  } else {
    moonIcon.classList.remove("fa-sun");
    moonIcon.classList.add("fa-moon");
  }
}
