document.addEventListener("DOMContentLoaded", () => {
  const percentageElement = document.getElementById("percentage");

  if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
      
      // 1. Real Battery Percentage Update Karein
      const updateBatteryInfo = () => {
        const level = Math.round(battery.level * 100);
        percentageElement.textContent = level;
      };

      updateBatteryInfo();
      battery.addEventListener('levelchange', updateBatteryInfo);

      // 2. Auto Close (Disconnect hone par page band/back ho jaye)
      const checkChargingStatus = () => {
        if (!battery.charging) {
          // Agar charger hata liya gaya hai, toh browser tab/window close ho jayegi
          window.close();
          // Fallback agar window.close() block ho toh home screen par bhej dega
          window.location.href = "about:blank"; 
        }
      };

      // Shuru hote hi check karein aur status change hone par track karein
      checkChargingStatus();
      battery.addEventListener('chargingchange', checkChargingStatus);
    });
  } else {
    percentageElement.textContent = "OK";
  }
});
