// alertModule.mjs

export const createAlerts = async (containerId) => {
    try {
        console.log("Fetching alerts from ../json/alerts.json");
        const response = await fetch("../json/alerts.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const alerts = await response.json();
        const container = document.getElementById(containerId);

        if (!container) {
            console.error("Alert container not found");
            return;
        }

        alerts.forEach((alert) => {
            const alertDiv = document.createElement("div");
            alertDiv.className = "alert";
            alertDiv.style.backgroundColor = alert.backgroundColor;
            alertDiv.textContent = alert.message;
            container.appendChild(alertDiv);
        });
    } catch (error) {
        console.error("Error fetching alerts:", error);
    }
};
