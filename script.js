document.getElementById("btnClose").addEventListener("click", () => {
     window.close();
 });
 
 function updateDateTime() {
     const now = new Date();
     document.getElementById("lblHora").textContent = now.toLocaleTimeString();
     document.getElementById("lblFecha").textContent = now.toLocaleDateString();
 }
 
 setInterval(updateDateTime, 1000);
 updateDateTime();
 