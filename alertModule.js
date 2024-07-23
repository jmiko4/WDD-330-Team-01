async function fetchAlerts() {
  try {
    const response = await fetch("alerts.json");
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error; // Propagate the error to the caller
  }
}

function createAlertElement(alert) {
  const p = document.createElement("p");
  p.textContent = alert.message;
  p.style.backgroundColor = alert.background;
  p.style.color = alert.color;
  return p;
}

async function displayAlerts() {
  try {
    const alerts = await fetchAlerts();
    if (alerts.length > 0) {
      const fragment = document.createDocumentFragment(); // Create a document fragment

      alerts.forEach((alert) => {
        const alertElement = createAlertElement(alert);
        fragment.appendChild(alertElement);
      });

      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.prepend(fragment); // Append all alerts at once
      } else {
        throw new Error("No <main> element found in the document.");
      }
    } else {
      console.log("No alerts to display.");
    }
  } catch (error) {
    console.error("Error displaying alerts:", error);
  }
}

// Call the displayAlerts function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", displayAlerts);
