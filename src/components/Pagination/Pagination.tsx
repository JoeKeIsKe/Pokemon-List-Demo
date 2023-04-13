import './Pagination.css'

interface Props {
  pageIndex: number;
  pageSize?: number;
  total: number;
  onPageChange: (pageIndex: number) => void;
}

function List(props: Props) {
  const { pageIndex, pageSize = 48, total, onPageChange } = props

  const onPageIndexChange = (pageIndex: number) => {
    onPageChange(pageIndex)
  }

  return (
    <div className='pagination-component'>
      <button disabled={pageIndex === 1} onClick={(e) => onPageIndexChange(pageIndex === 1 ? 1 : pageIndex - 1)}>Prev</button>
      <button disabled={(pageIndex * pageSize >= total)} style={{ marginLeft: '20px'}} onClick={(e) => onPageIndexChange(pageIndex + 1)}>Next</button>
    </div>
  );
}

export default List;
