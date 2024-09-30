const makeRequest = (url, param) => {
  return fetch(url, param)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      const error = new Error(`We have some problem, code: ${response.status}`)
      error.response = response
      throw error
    }
  })
  .catch(error => {
    console.log('Error', error)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  makeRequest('./source.json')
  .then(data => {
    console.log(data)
  })

  const map = L.map('map').setView([44.49620, 34.16482], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  const markersCoord = [[44.495579, 34.159745], [44.490413, 34.162245], [44.495755, 34.168940]]

  for (const coordArray of markersCoord) {
    const popup = L.popup({closeOnClick: true}).setContent(`<h4>my coord is ${coordArray[0]}, ${coordArray[1]}</h4>`)
    const marker = L.marker(coordArray).addTo(map)

    const tooltip = L.tooltip({
      permanent: true
    }).setContent('text')

    marker.bindTooltip(tooltip)
    marker.bindPopup(popup)
  }
});

