mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlwYXJrODY1OCIsImEiOiJjanducWd4a24wZWs5NDFuc3FsdW42ZzJ6In0.pu_AXXZhtA2MdgOtdBV_kQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [-122.349358, 47.620422]
});

// Fetch reported location from API
async function getReports() {
  const res = await fetch('/report/v1/');
  const data = await res.json();

  const reports = data.data.map(report => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          report.location.coordinates[1],
          report.location.coordinates[0]
        ]
      },
      properties: {
        crowdedness: report.crowdedness,
        icon: 'shop'
      }
    };
  });

  loadMap(reports);
}

// Load map with locations
function loadMap(reports) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: reports
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{crowdedness}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getReports();