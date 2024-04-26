document.addEventListener("DOMContentLoaded", async function () {
  const autonomousCommunityList = document.getElementById("autonomous-community-list");

  await fetch('./provincias.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Sin Respuesta');
          }
          return response.json();
      })
      .then(data => {
          console.log("Datos recibidos:", data);
          data.forEach(autonomousCommunity => {
              console.log("Comunidad Autónoma:", autonomousCommunity);
              // Filas Comunidades
              const communityRow = document.createElement("tr");
              const communityCell = document.createElement("td");
              communityCell.textContent = `${autonomousCommunity.label} (${autonomousCommunity.provinces.length} provinces)`;
              communityRow.appendChild(communityCell);
              communityRow.classList.add("community-row"); // Estilo css

              // +
              const communityToggleIcon = document.createElement("span");
              communityToggleIcon.textContent = "+";
              communityToggleIcon.classList.add("toggle-icon");
              communityCell.appendChild(communityToggleIcon);

              // Evento click
              communityCell.addEventListener("click", function () {
                  // Mostrar/Ocultar Provincias
                  communityRow.classList.toggle("active");
                  const provincesRow = communityRow.nextSibling;

                  if (!provincesRow || !provincesRow.classList.contains("provinces-row")) {
                      // Crear fila de Provincias si no hay
                      const newProvincesRow = document.createElement("tr");
                      newProvincesRow.classList.add("provinces-row");
                      const provincesCell = document.createElement("td");
                      provincesCell.setAttribute("colspan", "3");
                      const provincesTable = document.createElement("table");
                      provincesTable.classList.add("provinces-table");

                      // Iterar provincias de Comunidad
                      autonomousCommunity.provinces.forEach(province => {
                          console.log("Provincia:", province);
                          const provinceRow = document.createElement("tr");
                          const provinceCell = document.createElement("td");
                          provinceCell.textContent = `${province.label} (${province.towns.slice(0, 3).length} ciudades)`;
                          provinceRow.classList.add("province-row"); // Estilo Css

                          // +
                          const provinceToggleIcon = document.createElement("span");
                          provinceToggleIcon.textContent = "+";
                          provinceToggleIcon.classList.add("toggle-icon");
                          provinceCell.appendChild(provinceToggleIcon);

                          // Boton mas ciudades
                          const showMoreButton = document.createElement("button");
                          showMoreButton.textContent = "mas";
                          showMoreButton.classList.add("show-more-button");
                          showMoreButton.addEventListener("click", function (event) {
                              event.stopPropagation(); // Evitar propague a provincia
                              provinceCell.textContent = `${province.label} (${province.towns.length} ciudades)`;
                              province.towns.forEach(town => {
                                  const townItem = document.createElement("li");
                                  townItem.textContent = town.label;
                                  citiesList.appendChild(townItem);
                              });
                              showMoreButton.style.display = "none"; // Ocultar boton
                          });
                          provinceCell.appendChild(showMoreButton);

                          const citiesList = document.createElement("ul");
                          // Iterar solo 3 ciudades 
                          province.towns.slice(0, 3).forEach(town => {
                              console.log("Ciudad:", town);
                              const townItem = document.createElement("li");
                              townItem.textContent = town.label;
                              citiesList.appendChild(townItem);
                          });

                          provinceRow.appendChild(provinceCell);
                          provincesTable.appendChild(provinceRow);
                          provinceRow.appendChild(citiesList);
                      });

                      provincesCell.appendChild(provincesTable);
                      newProvincesRow.appendChild(provincesCell);
                      communityRow.parentNode.insertBefore(newProvincesRow, communityRow.nextSibling);
                      communityToggleIcon.textContent = "-"; // de + a -
                  } else {
                      // Si existe, Ocultar
                      provincesRow.remove();
                      communityToggleIcon.textContent = "+"; // de - a +
                  }
              });

              autonomousCommunityList.appendChild(communityRow);
          });
      })
      .catch(error => {
          console.error('Problema:', error);
      });
});
