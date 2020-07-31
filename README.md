## Vianova Coding Challenge

Challenge made by Rémy Gazelot (remy@gzt.fr)

## The challenge

GBFS is the format proposed by the NASBA to standardize data exchanges between cities, operators. You can find the complete specifications here <https://www.fastmail.com/mail/Inbox/(https://github.com/NABSA/gbfs)?u=d1b140c1>.

The challenge if you accept it, is to propose a front application, where we can see a map with multiple information layers:

- N.Y district GeoJSON <https://data.cityofnewyork.us/City-Government/Community-Districts/yfnk-k7r4>
- N.Y Bike stations information <http://gbfs.citibikenyc.com/gbfs/gbfs.json> <http://gbfs.citibikenyc.com/gbfs/gbfs.json>

To do so, you will notably need to use React <https://github.com/visgl/react-map-gl> and Mapbox <https://www.mapbox.com/solutions/real-time-maps>

It's up to you and depending on the time to propose the appropriate solution. The project should run on any local machine by unzipping the source file and by reading the documentation so we should be able to run it.

## Install

```cli
yarn install
yarn start
```

## My choices

I started the project with React using the [create-react-app](https://github.com/facebook/create-react-app) to easily setup my environment.

For the styles, I used [tailwindcss](https://tailwindcss.com/) which is a low level CSS Framework based on utils to easily and quickly style my app.

For the URL managing, I used [urijs](https://medialize.github.io/URI.js/).

## The map

### The stations

I wanted to use real-time to updates the stations using the data from [http://gbfs.citibikenyc.com/gbfs/gbfs.json](http://gbfs.citibikenyc.com/gbfs/gbfs.json).

Calling the station's informations in the frontend and draw on the fly all the stations into a layer was not a good way to go. This will lead to have a longer boot time with a higher Largest Contentful Paint (LCP).

I first needed to upload the station's informations as a layer in my styles in Mapbox Studio. This way, I'll have directly the layer out of the box from the style and nothing to process in my frontend application about positioning the points.

I use the [Beta Mapbox Tiling Service (MTS)](https://docs.mapbox.com/api/maps/#create-a-tileset-source). To prepare and process my data, I didn't used the [Tilesets CLI](https://github.com/mapbox/tilesets-cli/). I didn't wanted to install the Python tool for the challenge, but I think it's a must have for future works. I directly called the API using curl.

All the work on the data is located into the `data` folder. I needed to retrieved the data from the stations and process them to create a `stations_informations.ndjson` file. This work is done by the `stationNDJson.js` script. It transforms the `stations_informations.json` which comes from [https://gbfs.citibikenyc.com/gbfs/en/station_information.json](https://gbfs.citibikenyc.com/gbfs/en/station_information.json) into a `ndjson` format. The `recipe.json` file represents how the data will be processed to create tiles. This is where you keep or drop some properties and define how IDs are generated. Once the data are added using MTS, I created a stations layer into my Mapbox Studio style.

A hook `src/Map/useSubscribeBikeStations.js` subscribes to the citibikenyc's endpoint to refresh the stations informations every 5 seconds. Another hook `src/Map/useUpdateMapFeatureState` store the freshly pulled data into something called `feature-state` on every `features` stations. The `feature-state` is a feature's temporary state where we can put data on the fly. The hooks `usePaintStationsByNumBikesAvailable`, `usePaintDocksAvaialable` and `usePaintStationsStatus` are responsible to paint the stations according to the current feature enabled.

### The districts

I didn't know what to do with the districts data. I uploaded the GEOJSON as a dataset into Mapbox Studio to create a Tileset and then add it into my styles. The only feature related to this layer is simply a toggle.

### The languages

I used [react18next](https://react.i18next.com/) to handle the multi languages.

## What if all of this was not a quick challenge?

I would have used some library and do things in a different way:

- We need to have strong scripts to play with the MTS API. We can't rely on curls commands.
- We need to use type hinting in the project by using [Typescript](https://www.typescriptlang.org/) for example. This is a mandatory practice for all strong, cooperative and scalable application.
- We need to store stations data retrieved from the API into a state by using [Redux](https://redux.js.org/). This will allow us to handle data localy into our application. A good practice is to never directly use the data from a call. First process the async data retrieved and store them into the store. Then the connected components will be updated by the changes.
- We need to use something better for the component's styles. A good practice is to separate them by using [Styled components](https://styled-components.com/docs/basics).
- We need to have tests using [jest](https://jestjs.io/) to rely on a strong application.
- I'm not satisfied how I hide the layers. A layer could have an optional [visibility property](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-circle-visibility), which is not defined is this challenge. So I played with the opacity to toggle features. I think to be able to add this property by putting more time into the layer processed by the MTS API.
