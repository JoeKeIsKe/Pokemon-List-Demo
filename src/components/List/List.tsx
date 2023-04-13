import './List.css'
import { Pokemon } from '../../types'

interface Props {
  data: Pokemon[];
  pageIndex: number;
  pageSize?: number;
}

function List(props: Props) {
  const { data = [], pageIndex = 1, pageSize = 48 } = props
  const showData = data.slice(((pageIndex - 1) * pageSize), pageSize + ((pageIndex - 1) * pageSize));
  return (
    <div className='list-component'>
      <div className='title'>{`${data.length} results found.`}</div>
      <div className='container'>
        {
          showData.length > 0 && (
            showData.map((item: Pokemon) => (
              <div
                key={item.name}
              >
                <div className='list-item'>
                  <img src={item.imgUrl} alt={item.name} crossOrigin='anonymous' loading='lazy' />
                  <span>{item.name}</span>
                </div>
              </div>
            ))
          )
        }
        {
          data.length === 0 && (
            <p className='tips'>No results found.</p>
          )
        }
      </div>
    </div>
  );
}

export default List;
