import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { useInsertBulkUsers } from './hooks';
import { getUsersByName, user } from './selectors';

export default function FindAtomPage() {
  const [name, setName] = useState<string>('');
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

  const users = useRecoilValue(getUsersByName(name));

  return (
    <div>
      <div>
        <h3>Find Atom in AtomFamily</h3>
        <p>I have user data(id, name). And atom family key is id. But i want find by name!</p>
      </div>
      <hr />
      <div>
        <div style={{ display:'flex', marginBottom: '8px' }}>
          <div style={{ marginRight: '8px' }}>name: </div>
          <input onChange={(e) => { 
            setName(e.target.value);
          }}/>
        </div>
        <div>
          <div>Users</div>
          {users.length > 0 && (
            <ul style={{ marginTop: '4px' }}>
              {users.map((u) => (
                <li key={u.id}>
                  <code>
                    {`{ id: ${u.id}, name: ${u.name} }`}
                    </code>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
