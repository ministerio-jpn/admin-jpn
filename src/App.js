import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { api } from './api';

function App() {
  const [select, isSelect] = useState('todos')
  const [membros, setMembros] = useState([])
  useEffect(() => {
    api.get('membros').then(res => { setMembros(res.data); console.log(res.data) }).catch(error => console.log(error))
  }, [])
  return (
    <div className="flex flex-col items-center p-8">
      <div className='text-2xl font-bold'>MEMBROS</div>
      <div className='flex gap-3 p-6 w-44 justify-center border-b border-gray-300'>
        <div className={(select === 'todos' ? 'text-black' : 'text-gray-300') + ' cursor-pointer'}>Todos</div>
        <div className={(select === 'familia' ? 'text-black' : 'text-gray-300') + ' cursor-pointer'}>Família</div>
      </div>
      <div className='grid grid-cols-3 gap-4 py-4'>
        {membros.map(membro => (
          <div className='flex gap-4 items-center'>
            <div><img className='rounded-full h-28 w-28' src={`data:image/png;base64, ${membro.imagemBase64}`} /></div>
            <div>{membro.nomeCompleto}
              <div className='text-gray-300'>Data de nascimento: {membro.dataNascimento}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
