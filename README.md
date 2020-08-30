# Accidents in Washington, DC (2010-2014)

## Setup
```
npm install
npm start
```
View site on <a href="http://localhost:8080">http://localhost:8080</a>

## Requirements
* Use at least two types of visualization, one of which must be geo-based
  - I set up 3 charts (line, bar, pie), and 1 geo-based <a href="https://leafletjs.com/">Leaflet</a> map 
* Use the D3.js library for at least one of the visualizations
  - The charts all use D3
* Provide interactivity between visualizations as well as user interactivity points
  - User can toggle between "by year" (chart) and "by location" (geo) tabs
  - Data persists as user toggles back and forth between tabs
  - The chart types are chosen via radio button on the "by year" tab
  - The locations show up as highlighted polygons on a leaflet map; click on the polygon to see location name
* Provide at least one interaction that allows users to limit/filter/search data
  - The locations can be filtered by multiple years
* You may use any third-party libraries you see fit in addition to D3
  - I used <a href="https://c3js.org/">C3.js</a> for the chart visualizations
* Responsive design / mobile compatibility is optional
  - I used <a href="https://material-ui.com/">Material-UI</a> components so the app is *generally* responsive


## Process
* Thought process
  - Rather then rely on something like create-react-app, I set up a basic webpack setup with css/scss loaders and webpack-dev-server to run locally.
  - Had never used Leaflet before but seemed like a good time to try it out rather than Google Maps for the geo-based visualization. 
  - Given time constraints, decided to use C3.js rather than build D3 charts from scratch.
  - Chose Material-UI to have the app look decent without spending much time on look & feel.
  - Massaged the data *a little*...
    - Added `accident_years` to the `feature.properties` for easier filtering
    - Created a `bounds` array of all latLngs (had to reverse()!) to center the map
    - Created `accidents_per_year` to drive the chart visualizations without needing to calculate that on every chart render
  - Started out with just internal component state, but added redux to easily persist selected chart type and filtered years/features as user toggled between tabs rather than it getting reset on each tab toggle. I could've done this without redux and passing down setState refs from a parent component since its a small app, but that felt meh.
  - Using componentDidMount/shouldComponentUpdate to add third-party libs, and send updated props into them without re-rendering the component.
* What I didn't do (things I might add/improve on with more time)
  - There's some hacks in the reducer to clone objects and not worry about mutable objects. In a "real" app, I would've added <a href="https://immutable-js.github.io/immutable-js/">ImmutableJS</a>.
  - I put all the actions/reducers/selectors in single files but would break those out by feature to scale in a "real" app.
  - I'm importing the data as a static object rather than retrieving it via a http request. I could've set up some kind of request module (i.e. with axios/fetch) in case this data was intended to be more dynamic.
  - I really only added a couple lines of CSS/SCSS; the app relies heavily on default UI from Material, Leaflet, and C3. I could've come up with something more custom. :)
  - Could set up a real generated build rather than just use webpack-dev-server.
  - Tests for the actions, reducer, initialState bootstrap method
* Potential issues with implementation
  - I played around with it a bit and it seems relatively stable. 
  - I did see 1 weird issue when you load the pie chart for the first time -- the years under the chart align off-center to the left. If user toggles away/back to "pie" again (either via radio or tabs), they center correctly. I'm probably not loading/unloading chart data 100% properly. 
  - There's some external calls to google/leaflet styles so you do need internet access to run
  - I only looked at this in desktop Chrome on Windows. :)
* Time spent
  - ~8 hours (including this README)
