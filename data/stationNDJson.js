const fs = require("fs");

function main() {
  const sourceFile = "./stations_informations.json"
  const outputFileName = 'stations_informations.ndjson'
  const stationsInformations = JSON.parse(fs.readFileSync(sourceFile).toString())

  const features = stationsInformations.data.stations.reduce((acc, station) => {
    acc.push(JSON.stringify({
      type: 'Feature',
      properties: {
        station_id: parseInt(station.station_id),
        name: station.name,
        capacity: station.capacity,
        short_name: station.short_name
      },
      geometry: {
        coordinates: [station.lon, station.lat],
        type: 'Point'
      }
    }))

    return acc
  }, [])

  fs.writeFile(outputFileName, features.join("\r\n"), error => console.log(error))
}

main()
