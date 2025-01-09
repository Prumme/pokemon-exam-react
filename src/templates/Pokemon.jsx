import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null)
  let params = useParams()

  useEffect(() => {
    const fetchData = async () => {
    const response  = await axios.get("https://nestjs-pokedex-api.vercel.app/pokemons/" + params.id)
    setPokemon(response.data)
    }

    fetchData()
    .catch(console.error);      
  }, [params])

  if(!pokemon) return <h1>Loading...</h1>

  return (   
    <div className="grid grid-cols-2 gap-4 p-8 dark:bg-slate-800 h-screen">
      <div className="space-y-4">
        <div className="bg-sky-200 rounded-md p-4 flex flex-col items-center">
          <h1 className="text-4xl tracking-widest">{pokemon.name}</h1>
          <img className="max-h-64" src={pokemon.image} alt={pokemon.name} />
          <img src={pokemon.sprite} alt={pokemon.name} />
          <div className="flex gap-2">
            {pokemon.types.map((type, index) => (
              <div key={index} className="flex flex-col items-center">
              <img className="h-12 w-12" src={type.image} alt={type.name} />
              <span>{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
            <h1 className="text-2xl tracking-widest text-center">Évolution</h1>
            {pokemon.evolutions.map((evolution, index) => (
              <div key={index} className="bg-sky-200 rounded-md p-4 flex flex-col items-center h-full">
                <h1 className="text-lg tracking-widest">{evolution.name}</h1>
                <Link to={"/pokemon/" + evolution.pokedexId} className="block text-center w-full py-2 rounded-sm bg-[#FCB0B3] hover:scale-105 duration-150">Voir plus</Link>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-sky-200 rounded-md p-4 flex flex-col items-center h-fit">
        <h1 className="text-xl">Pokemon Statistique</h1>
        <div className="w-full flex flex-col gap-4">
          {Object.entries(pokemon.stats).map(([statName, statValue]) => (
            <div key={statName} className="w-full">
              <div className="flex justify-between">
                <span className="capitalize">{statName}</span>
                <span>{statValue}</span>
              </div>
              <div className="relative w-full h-4 bg-sky-200 rounded">
                <div
                  className="absolute h-4 bg-[#FCB0B3] rounded"
                  style={{ width: `${(statValue / 255) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
   
  )
}

export default Pokemon