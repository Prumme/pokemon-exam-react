import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useOutletContext } from "react-router-dom";

const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(1)
  const [selectedTypes, nameSearched] = useOutletContext()

  const handleScroll = () => {

    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

    if (bottom) {
      setPage(page + 1)
    }
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true
  });

  useEffect(() => {
    const fetchData = async () => {
      const req = axios.create(
        {
          url: "https://nestjs-pokedex-api.vercel.app/pokemons",
          params: {
            limit: 50 * page,
            types: selectedTypes.length === 0 ? null : selectedTypes.map(type => type.value),
            name: nameSearched
          },
        }
      )
      const response  = await req.get("https://nestjs-pokedex-api.vercel.app/pokemons")
      setPokemons(response.data)
      
    }
    

      fetchData()
      .catch(console.error);  
    
    
  }, [page, selectedTypes, nameSearched])


  return (
    <div className="grid grid-cols-5 gap-4 p-8 dark:bg-slate-800">

    {pokemons.map((pokemon) => (
      <div key={pokemon.id} className="bg-sky-200 h-fit rounded-md p-4">
        <h2 className="text-lg text-center tracking-widest">#{pokemon.pokedexId} {pokemon.name}</h2>
        <div className="flex justify-center gap-2">

          {pokemon.types.map((type, index) => (
            <img className="h-4 w-4 " key={index} src={type.image} alt={type.name} />
          ))}
        </div>
        <img className="hover:rotate-180 delay-[2000ms] transition duration-300" src={pokemon.image} alt={pokemon.name} />
        <Link to={"pokemon/" + pokemon.pokedexId} className="block text-center w-full py-2 rounded-sm bg-[#FCB0B3] hover:scale-105 duration-150">Voir plus</Link>
      </div>
    ))}
    </div>
  )
}

export default Pokedex