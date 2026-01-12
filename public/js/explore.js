document.addEventListener("DOMContentLoaded", () => {
    const spots = window.__SPOTS__ || [];
  
    // Map
    const map = L.map("explore-map", { zoomControl: true }).setView([51.3813, -2.359], 13);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
  
    const markersById = new Map();
  
    
    const base = { lat: 51.3813, lng: -2.359 };
  
    spots.forEach((s, i) => {
      let lat = s.lat;
      let lng = s.lng;
  
      
      if (typeof lat !== "number" || typeof lng !== "number") {
        const jitter = (i % 7) * 0.001; 
        lat = base.lat + jitter;
        lng = base.lng - jitter;
      }
  
      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(`<b>${s.title || "Spot"}</b><br>${s.locationName || ""}`);
      markersById.set(String(s._id), marker);
    });
  
    
    document.querySelectorAll("[data-spot-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-spot-id");
        const marker = markersById.get(String(id));
        if (!marker) return;
  
        map.setView(marker.getLatLng(), 16, { animate: true });
        marker.openPopup();
      });
    });
  
    
    setTimeout(() => map.invalidateSize(), 200);
  });
  
  