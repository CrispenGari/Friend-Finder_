"usestrict";
let map;

let markers = new Map();
document.addEventListener("DOMContentLoaded", () => {
  const socket = io("/");
  socket.on("locationUpdate", (data) => {
    $("#online_users").html(`You & ${data.length} other(s) online`);
    markers.forEach((marker, id) => {
      marker.setMap(null);
      markers.delete(id);
    });
    data.forEach(([id, position]) => {
      if (position.lat && position.lng) {
        const marker = new google.maps.Marker({
          position,
          map,
          title: id,
        });
        markers.set(id, marker);
      }
    });
  });
  setInterval(() => {
    socket.emit("requestLocation");
  }, 2000);
});
function initMap() {
  navigator.geolocation.getCurrentPosition((pos) => {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: lat,
        lng: lng,
      },
      zoom: 8,
    });
  });
}
