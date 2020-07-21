import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setnextPageUrl] = useState()
  const [previousPageUrl, setpreviousPageUrl] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setloading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setloading(false)
      setnextPageUrl(res.data.next)
      setpreviousPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })
    return () => cancel()
  }, [currentPageUrl])

  if (loading) return "loading..."

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl)
  }

  function gotoPreviousPage() {
    setcurrentPageUrl(previousPageUrl)
  }

  return (
    <>
    <PokemonList pokemon={pokemon} />
    <Pagination 
      gotoNextPage={nextPageUrl ? gotoNextPage : null}
      gotoPreviousPage={previousPageUrl ? gotoPreviousPage : null}
    />
    </>
  );
}

export default App;
