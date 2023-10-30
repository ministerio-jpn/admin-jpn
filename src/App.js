import './App.css';
import { useEffect, useState } from 'react';
import { api } from './api';
import Pagination from './component/Pagination';

function App() {
  const [select, isSelect] = useState('todos')
  const [membros, setMembros] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    if (membros.length > 0) return;
    api.get('membros').then(res => { setMembros(res.data.content); setTotalPages(res.data.totalPages); setPage(res.data.number); console.log(res.data) }).catch(error => console.log(error))
  }, [])

  const [selectedMonth, setSelectedMonth] = useState('');

  const filterData = (mes) => {
    if(mes === ''){
      api.get('membros').then(res => { setMembros(res.data.content); setTotalPages(res.data.totalPages); setPage(res.data.number); console.log(res.data) }).catch(error => console.log(error))
      }else{
        api.get(`membros/filter-data?mes=${mes}`).then(res => { setMembros(res.data.content); setTotalPages(res.data.totalPages); setPage(res.data.number); console.log(res.data) }).catch(error => console.log(error))
      }
  };

  const onChangePage = (page) => {
    api.get(`membros?page=${page}`).then(res => { setMembros(res.data.content); setTotalPages(res.data.totalPages); setPage(res.data.number); console.log(res.data) }).catch(error => console.log(error))
  }

  return (
    <div className="flex flex-col items-center p-8">
      {membros.length === 0 ? <>Carregando...</> : <></>}
      <div className='text-2xl font-bold'>MEMBROS</div>
      <div className='flex p-6 justify-between w-full border-b border-gray-300'>
        <div className='flex gap-3 font-bold'>
          <div className={(select === 'todos' ? 'text-black' : 'text-gray-300') + ' cursor-pointer'}>Todos</div>
          <div className={(select === 'familia' ? 'text-black' : 'text-gray-300') + ' cursor-pointer'}>Família</div>
        </div>
        <div>
          <label>Filtrar por mês:</label><br/>
          <select className='border border-gray-300 px-4 rounded bg-white' onChange={e => { filterData(e.target.value) }}>
            <option value="">Todos os Meses</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>

        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-4'>
        {membros.map(membro => (
          <div className='flex gap-4 items-center'>
            <div><img className='rounded-full h-28 w-28' src={`data:image/png;base64, ${membro.imagemBase64}`} /></div>
            <div>{membro.nomeCompleto}
              <div className='text-gray-300'>Data de nascimento: {membro.dataNascimento}</div>
            </div>
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} onPageChange={(e) => onChangePage(e)} currentPage={page} />
    </div>
  );
}

export default App;
