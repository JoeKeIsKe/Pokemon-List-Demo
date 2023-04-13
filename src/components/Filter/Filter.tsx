import { useState, useEffect } from 'react';
import './Filter.css'
import { Type, Pokemon, RawPokemon } from '../../types'


interface Props {
  onTypeChange: (pokemon: Pokemon[] | null) => void
}

const pokemonInTypes: {[key: string]: Pokemon[]} = {}

function Filter(props: Props) {
  const { onTypeChange } = props

  const [types, setTypes] = useState<Type[]>([])
  const [typesSelected, setTypesSelected] = useState<string[]>([])

  const onTypeClick = (name: string) => {
    // select types
    if (typesSelected.includes(name)) {
      setTypesSelected(typesSelected.filter(item => item !== name))
    } else {
      const temp = Array.from(typesSelected)
      temp.push(name)
      setTypesSelected(temp)
    }
  }

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then(res => res.json())
      .then(
        (result) => {
          setTypes((result && result.results) || []);
        }
      )
  }, [])

  useEffect(() => {
    types.forEach(item => {
      fetch(item.url)
      .then(res => res.json())
      .then(
        (result) => {
          const { pokemon = [] } = result
          pokemonInTypes[item.name] = pokemon.map((item:RawPokemon) => item.pokemon)
        }
      )
    })
  }, [types])

  useEffect(() => {
    let pokemonFiltered: Pokemon[] | null = null
    if (typesSelected.length) {
      typesSelected.forEach((type: string) => {
        pokemonFiltered = pokemonFiltered ? pokemonFiltered.filter((item: Pokemon) => pokemonInTypes[type].some((i: Pokemon) => i.name === item.name)) : pokemonInTypes[type]
      })
    }
    onTypeChange(pokemonFiltered)
  }, [typesSelected, onTypeChange])

  return (
    <div className='filter-component'>
      <span className='title'>Types:</span>
      <div className='container'>
      {
        types.map((item: Type) => (
          <div
            key={item.name}
            className={`filter-item py-2 ${typesSelected.includes(item.name) ? 'selected' : ''}`}
            onClick={() => onTypeClick(item.name)}
          >
            {item.name}
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default Filter;
