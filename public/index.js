document.addEventListener("DOMContentLoaded", () => {
  const socket = io("/");
  const positionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  // instead of updating location after some seconds we watch
  // position
  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      socket.emit("updateLocation", { lat, lng });
    },
    (err) => console.err(err),
    positionOptions
  );
});
