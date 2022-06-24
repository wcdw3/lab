import { useRecoilValue } from 'recoil';
import { getUsersByNameInputValue } from './selectors';

export default function UserList() {
  const users = useRecoilValue(getUsersByNameInputValue);

  return (
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
  )
}
