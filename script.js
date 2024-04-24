var data = {
    "autonomous_communities": [
      {
        "name": "Andalucia",
        "provinces": [
          {
            "name": "Almeria",
            "cities": [
              "Almeria",
              "Roquetas de Mar",
              "El Ejido"
            ]
          },
          {
            "name": "Cadiz",
            "cities": [
              "Cadiz",
              "Jerez de la Frontera",
              "Algeciras"
            ]
          },
          {
            "name": "Cordoba",
            "cities": [
              "Cordoba",
              "Lucena",
              "Puente Genil"
            ]
          },
          {
            "name": "Granada",
            "cities": [
              "Granada",
              "Motril",
              "Almunecar"
            ]
          },
          {
            "name": "Huelva",
            "cities": [
              "Huelva",
              "Lepe",
              "Almonte"
            ]
          },
          {
            "name": "Jaen",
            "cities": [
              "Jaen",
              "Linares",
              "Andujar"
            ]
          },
          {
            "name": "Malaga",
            "cities": [
              "Malaga",
              "Marbella",
              "Torremolinos"
            ]
          },
          {
            "name": "Sevilla",
            "cities": [
              "Sevilla",
              "Dos Hermanas",
              "Alcala de Guadaira"
            ]
          }
        ]
      },
      {
        "name": "Canarias",
        "provinces": [
          {
            "name": "Las Palmas",
            "cities": [
              "Las Palmas de Gran Canaria",
              "Telde",
              "Santa Lucia de Tirajana"
            ]
          },
          {
            "name": "Santa Cruz de Tenerife",
            "cities": [
              "Santa Cruz de Tenerife",
              "San Cristobal de La Laguna",
              "Arona"
            ]
          },
          {
            "name": "La Palma",
            "cities": [
              "Santa Cruz de La Palma",
              "Los Llanos de Aridane",
              "Brena Alta"
            ]
          }
        ]
      },
      {
        "name": "Cantabria",
        "provinces": [
          {
            "name": "Cantabria",
            "cities": [
              "Santander",
              "Torrelavega",
              "Camargo"
            ]
          },
          {
            "name": "Castro Urdiales",
            "cities": [
              "Castro Urdiales",
              "Laredo",
              "Colindres"
            ]
          }
        ]
      },
      {
        "name": "Cataluna",
        "provinces": [
          {
            "name": "Barcelona",
            "cities": [
              "Barcelona",
              "L'Hospitalet de Llobregat",
              "Badalona"
            ]
          },
          {
            "name": "Girona",
            "cities": [
              "Girona",
              "Figueres",
              "Blanes"
            ]
          },
          {
            "name": "Lleida",
            "cities": [
              "Lleida",
              "Mollerussa",
              "Tarrega"
            ]
          },
          {
            "name": "Tarragona",
            "cities": [
              "Tarragona",
              "Reus",
              "Cambrils"
            ]
          }
        ]
      },
      {
        "name": "Galicia",
        "provinces": [
          {
            "name": "A Coruna",
            "cities": [
              "A Coruna",
              "Ferrol",
              "Santiago de Compostela"
            ]
          },
          {
            "name": "Lugo",
            "cities": [
              "Lugo",
              "Viveiro",
              "Monforte de Lemos"
            ]
          },
          {
            "name": "Ourense",
            "cities": [
              "Ourense",
              "Verin",
              "O Barco de Valdeorras"
            ]
          },
          {
            "name": "Pontevedra",
            "cities": [
              "Vigo",
              "Pontevedra",
              "Vilagarcia de Arousa"
            ]
          }
        ]
      },
      {
        "name": "Asturias",
        "provinces": [
          {
            "name": "Asturias",
            "cities": [
              "Oviedo",
              "Gijon",
              "Aviles"
            ]
          }
        ]
      },
      {
        "name": "Murcia",
        "provinces": [
          {
            "name": "Murcia",
            "cities": [
              "Murcia",
              "Cartagena",
              "Lorca"
            ]
          }
        ]
      },
      {
        "name": "Madrid",
        "provinces": [
          {
            "name": "Madrid",
            "cities": [
              "Madrid",
              "Alcala de Henares",
              "Leganes"
            ]
          }
        ]
      }
    ]
  }
    
  document.addEventListener("DOMContentLoaded", function () {
    const autonomousCommunityList = document.getElementById("autonomous-community-list");

    data.autonomous_communities.forEach(community => {
        //Filas Comunidades
        const communityRow = document.createElement("tr");
        const communityCell = document.createElement("td");
        communityCell.textContent = `${community.name} (${community.provinces.length} provinces)`;
        communityRow.appendChild(communityCell);
        communityRow.classList.add("community-row"); // Estilo css

        // +
        const communityToggleIcon = document.createElement("span");
        communityToggleIcon.textContent = "+";
        communityToggleIcon.classList.add("toggle-icon");
        communityCell.appendChild(communityToggleIcon);

        // Eento click
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

                // Iterar provincias de la Comunidad
                community.provinces.forEach(province => {
                    const provinceRow = document.createElement("tr");
                    const provinceCell = document.createElement("td");
                    provinceCell.textContent = `${province.name} (${province.cities.length} cities)`;
                    provinceRow.classList.add("province-row"); // Estilo Css

                    // +
                    const provinceToggleIcon = document.createElement("span");
                    provinceToggleIcon.textContent = "+";
                    provinceToggleIcon.classList.add("toggle-icon");
                    provinceCell.appendChild(provinceToggleIcon);

                    // Click para mostrar ciudades
                    provinceCell.addEventListener("click", function (event) {
                        event.stopPropagation(); // Evitar que el clic se propague a la fila de la provincia

                        // Mostrar/Ocultar Ciudades
                        provinceRow.classList.toggle("active");
                        const citiesRow = provinceRow.nextSibling;

                        if (!citiesRow || !citiesRow.classList.contains("cities-row")) {
                            // Crear fila de ciudades si no hay
                            const newCitiesRow = document.createElement("tr");
                            newCitiesRow.classList.add("cities-row");
                            const citiesCell = document.createElement("td");
                            citiesCell.setAttribute("colspan", "3");
                            const citiesList = document.createElement("ul");

                            // Iterar Ciudades de la Provincia
                            province.cities.forEach(city => {
                                const cityItem = document.createElement("li");
                                cityItem.textContent = city;
                                citiesList.appendChild(cityItem);
                            });

                            citiesCell.appendChild(citiesList);
                            newCitiesRow.appendChild(citiesCell);
                            provinceRow.parentNode.insertBefore(newCitiesRow, provinceRow.nextSibling);
                            provinceToggleIcon.textContent = "-"; // de + a -
                        } else {
                            // Si existe, Ocultar
                            citiesRow.remove();
                            provinceToggleIcon.textContent = "+"; // de - a +
                        }
                    });

                    provinceRow.appendChild(provinceCell);
                    provincesTable.appendChild(provinceRow);
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
});
