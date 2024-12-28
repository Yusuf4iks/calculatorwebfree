let display = document.getElementById("display");

    function appendValue(value) {
      display.value += value;
    }

    function clearDisplay() {
      display.value = "";
    }

    function checkCode() {
      if (display.value === "281224") {
        window.location.href = "secret.html"; // Замените ссылку
      } else {
        clearDisplay();
      }
    }
