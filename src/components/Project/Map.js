import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Autosuggest from 'react-autosuggest'
import { Map, Marker, TileLayer, Polygon } from 'react-leaflet'

const getSuggestionValue = suggestion => suggestion.text

const renderSuggestion = suggestion => (
  <div>
    {suggestion.text}
  </div>
)

const labelForPlace = (properties) => {
  let labels = []
  if(properties.name) labels.push(properties.name)
  if(properties.street) labels.push(properties.name)
  if(properties.city) labels.push(properties.city)
  if(properties.country) labels.push(properties.country)

  return labels.join(', ')
}

const getLocations = async (searchTerm) => {
  const response = await axios(`http://photon.komoot.de/api/?q=${searchTerm}&lang=en`)
  const places = response.data.features.map(place =>
    ({
      text: labelForPlace(place.properties),
      coordinates: place.geometry.coordinates
    })
  )
  return places
}

const MapComponent = ({onClick, mapCenter, zoom, marker, polygon}) =>
  <Map onClick={onClick} center={mapCenter} zoom={zoom} className="map__reactleaflet" style={{width: '550px', height: '300px'}}>
    <TileLayer
      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
    />
    {marker && <Marker position={marker} />}
    {polygon !== [] && <Polygon positions={polygon} color="blue" />}
  </Map>

export default ({polygon, setPolygon}) => {
  const [value, setValue] = useState('')
  const [mapCenter, setMapCenter] = useState([1.42965855, 114.74059919809318])
  const [zoom, setZoom] = useState(6)
  const [marker, setMarker] = useState(false)
  const [suggestions, setSugestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedValue = useDebounce(value, 700)

  const handleMapClick = (position) => {
    setPolygon([...polygon, [position.latlng.lat, position.latlng.lng]])
  }

  const resetPolygon = (e) => {
    e.preventDefault()
    setPolygon([])
  }


  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const inputProps = {
    placeholder: 'Type a location',
    value,
    onChange,
    style: {width: '506px', padding: '20px'}
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    console.log('fetch requested')
  }

  const onSuggestionsClearRequested = () => {
    setSugestions([])
  }

  useEffect(
    () => {
      if (debouncedValue && debouncedValue.length > 2) {
        setIsSearching(true)
        getLocations(debouncedValue).then(results => {
          setIsSearching(false)
          setSugestions(results)
        })
      } else {
        setSugestions([])
      }
    },
    [debouncedValue]
  )

  const onSuggestionSelected = (event, { suggestion }) => {
    console.log(suggestion)
    setMapCenter([suggestion.coordinates[1], suggestion.coordinates[0]])
    setMarker([suggestion.coordinates[1], suggestion.coordinates[0]])
    setZoom(14)
  }

  return <div>
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />

  <div className="map" style={{width: '408px'}}>
    {isSearching && <p>Loading...</p>}
    <MapComponent onClick={handleMapClick} mapCenter={mapCenter} zoom={zoom} marker={marker} polygon={polygon} />
    <p>Project coordinates:</p>
    <p><button onClick={resetPolygon}>Start again</button></p>
    {polygon.map((coords, index) => <p>{index+1}. lat: {coords[0]} lng: {coords[1]}</p>)}

  </div>
  </div>
}

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      }
    },
    [value]
  )

  return debouncedValue
}

