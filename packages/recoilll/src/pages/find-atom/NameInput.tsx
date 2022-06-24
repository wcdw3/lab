import { useSetRecoilState } from 'recoil';
import { nameInputValue } from './atoms';

export default function NameInput() {
  const setNameInputValue = useSetRecoilState(nameInputValue);

  return (
    <input onChange={(e) => { setNameInputValue(e.target.value); }} />
  );
}
