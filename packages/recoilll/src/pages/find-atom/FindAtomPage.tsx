import { useEffect } from 'react'
import { useInsertBulkUsers } from './hooks';
import NameInput from './NameInput';
import UserList from './UserList';

export default function FindAtomPage() {
  const insertBulkUsers = useInsertBulkUsers();
  useEffect(() => {
    insertBulkUsers([
      {
        id: '1',
        name: 'sam'
      },
      {
        id: '2',
        name: 'bob'
      },
      {
        id: '3',
        name: 'harry'
      },
      {
        id: '4',
        name: 'lee'
      },
      {
        id: '5',
        name: 'kim'
      },
      {
        id: '6',
        name: 'park'
      },
      {
        id: '7',
        name: 'choi'
      },
    ]);
  }, []);

  return (
    <div>
      <div>
        <h3>Find Atom in AtomFamily</h3>
        <p>I have user data(id, name). And atom family key is id. But i want find by name!</p>
      </div>
      <hr />
      <div>
        <div style={{ display:'flex', marginBottom: '8px' }}>
          <div style={{ marginRight: '8px' }}>Name: </div>
          <NameInput />
        </div>
        <UserList />
      </div>
    </div>
  )
}
