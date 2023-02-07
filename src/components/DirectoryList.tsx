import { useState } from "react";
import "../App.css";
import { createDirectory, deleteDirectory, fetchImageDirectories } from "../helpers/FileStystem";
import { Directory } from "../interfaces/Directory";

async function handleCreateNewDirectory(newDirectory: string, setDirs: any) {
  await createDirectory(newDirectory)
  const directories = await fetchImageDirectories()
  setDirs(directories)
}

function directory(name: string, activeDir: string, setActiveDir: any, setImageIndex: any, setDirs: any) {
  return (
    <div key={name} style={{...styles.image, ...(activeDir === name && styles.active), display: 'flex'}} onClick={() => {
      setImageIndex(0)
      setActiveDir(name)
    }}>
      <h2 style={{ flexGrow: 1}}>{name}</h2>
      <button onClick={async () => {
        deleteDirectory(name)
        const directories = await fetchImageDirectories()
        setDirs(directories)
      }}>X</button>
    </div>
  )
}

export default function DirectoryList({ directories, activeDir, setActiveDir, setImageIndex, setDirs }: { directories: Directory[], activeDir: string, setActiveDir: any, setImageIndex: any, setDirs: any }) {
  const [newDirectory, setNewDirectory] = useState('')

  return (
   <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'teal'}}>
      { directories.length > 0 &&
        directories.map((dir: Directory) => directory(dir.name, activeDir, setActiveDir, setImageIndex, setDirs))
      }
      <input type='text' id='directory' name='director' value={newDirectory} onChange={(e) => setNewDirectory(e.target.value)}/>
      <button onClick={() => handleCreateNewDirectory(newDirectory, setDirs)}>Add new directory</button>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
  },
  image: {
    borderStyle: 'solid',
    borderWidth: '10px',
    borderColor: 'black',
  },
  active: {
    borderColor: 'green',
    borderWidth: '10px',
    animationDuration: '0s',
    animationDelay: '0s'
  }
}