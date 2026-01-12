document.querySelectorAll(".side-card[data-lat][data-lng]").forEach((card) => {
    card.addEventListener("click", () => {
      const lat = Number(card.dataset.lat);
      const lng = Number(card.dataset.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
  
      map.setView([lat, lng], 16, { animate: true });
    });
  });
  