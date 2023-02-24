import { forwardRef, useState } from "react";

import { Dispatcher } from "../interfaces/Dispatcher";

interface Props {
  listItems: string[]
  moveDirectory: string
  setMoveDirectory: Dispatcher<string>
}

export default forwardRef(function TagBar(props: Props, ref) {
  const { listItems, moveDirectory, setMoveDirectory } = props

  return (
    <div style={styles.container}>
      <input style={styles.input} ref={ref} type='text' list='listid' value={moveDirectory} onChange={e => setMoveDirectory(e.target.value)} />
        <datalist id='listid'>
          { listItems.length > 0 && listItems.map((li) => <option label={li} value={li}/>)}
        </datalist>
    </div>
  );
})

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '5px',
  },
  input: {
    width: '20%'
  }
}