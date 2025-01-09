import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { MultiSelect } from "react-multi-select-component";
import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {

  const [types, setTypes] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [nameSearched, setNameSearched] = useState("")

  const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://nestjs-pokedex-api.vercel.app/types")
      setTypes(response.data)
    }

    fetchData()
    .catch(console.error)
  }, [])

  return (
    <>
      <header className="h-10 bg-sky-300 w-full flex justify-start items-center gap-x-4 px-4">
          <h1 className="text-center text-2xl"><Link to="/">Pokedex</Link></h1>

            <MultiSelect
            options={types.map((type) => ({ label: type.name, value: type.id }))}
            value={selectedTypes}
            onChange={setSelectedTypes}
            labelledBy="Types"
          />


          <input onChange={(e) => setNameSearched(e.target.value)} type="text" className="bg-white rounded-md px-2 py-1" placeholder="Nom du Pokemon"/>

          <button onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <IoIosSunny />
                }
                {
                    !dark && <IoMoon /> 
                }
          </button>
      </header>
      <Outlet context={[selectedTypes, nameSearched]} />
    </>
  )
}

export default MainLayout