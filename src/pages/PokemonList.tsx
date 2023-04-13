import { useState, useEffect, useCallback } from 'react';
import Filter from '../components/Filter/Filter'
import List from '../components/List/List'
import Pagination from '../components/Pagination/Pagination'
import { Pokemon } from '../types'

function PokemonList() {
  const [rawData, setRawData] = useState<Pokemon[]>([])
  const [data, setData] = useState<Pokemon[]>([])
  const [pokemonFiltered, setPokemonFiltered] = useState<Pokemon[] | null>(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize] = useState(48)

  const getData = (allData?: Pokemon[]) => {
    const initial = (pageIndex - 1) * pageSize
    let count = initial
    let maxCount = initial + pageSize
    if (pokemonFiltered) {
      maxCount = maxCount > pokemonFiltered.length ? pokemonFiltered.length : maxCount
      if (maxCount === 0) {
        return setData([])
      }
      while (count < maxCount) {
        const temp = [...pokemonFiltered]
        if (temp[count]) {
          const obj = temp[count]
          const index = count
          if (!obj.imgUrl) {
            fetch(obj.url)
            .then(res => res.json())
            .then(
              (result) => {
                const { sprites = {} } = result
                const imgUrl = sprites.other['official-artwork']['front_default'] || null
                obj.imgUrl = imgUrl
                temp[index] = obj
                setData(temp)
              }
            )
          }
        }
        setData(temp)
        count++
      }
    } else {
      while (count < maxCount) {
        const temp = allData ? [...allData] : [...rawData]
        if (temp[count]) {
          const obj = temp[count]
          const index = count
          if (!obj.imgUrl) {
            fetch(obj.url)
            .then(res => res.json())
            .then(
              (result) => {
                const { sprites = {} } = result
                const imgUrl = sprites.other['official-artwork']['front_default'] || null
                obj.imgUrl = imgUrl
                temp[index] = obj
                setRawData(temp)
                setData(temp)
              }
            )
          }
        }
        setRawData(temp)
        setData(temp)
        count++
      }
    }
  }

  const onTypeChange = useCallback((pokemon: Pokemon[] | null) => {
    setPokemonFiltered(pokemon)
    setPageIndex(1)
  }, [])

  const onPageChange = (pageIndex: number) => {
    setPageIndex(pageIndex)
  }

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1200')
      .then(res => res.json())
      .then(
        (result) => {
          const { results = [] } = result
          setRawData(results)
          getData(results)
        }
      )
  }, [])

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pokemonFiltered])

  return (
    <div className="Pokemon-List">
      <Filter onTypeChange={onTypeChange} />
      <List data={data} pageIndex={pageIndex} />
      <Pagination pageIndex={pageIndex} pageSize={pageSize} total={data.length} onPageChange={onPageChange} />
    </div>
  );
}

export default PokemonList;