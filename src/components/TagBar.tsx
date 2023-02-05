import { useState } from "react";

import { Dispatcher } from "../interfaces/Dispatcher";

interface Props {
  listItems: string[]
  moveDirectory: string
  setMoveDirectory: Dispatcher<string>
}

export default function TagBar(props: Props) {
  const { listItems, moveDirectory, setMoveDirectory } = props

  return (
    <div>
      <input type='text' list='listid' value={moveDirectory} onChange={e => setMoveDirectory(e.target.value)} />
        <datalist id='listid'>
          { listItems.length > 0 && listItems.map((li) => <option label={li} value={li}/>)}
        </datalist>
    </div>
  );
}
