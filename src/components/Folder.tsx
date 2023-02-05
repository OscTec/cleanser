import { useState } from "react";
import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import { downloadDir } from '@tauri-apps/api/path';
import "../App.css";

export default function Folder() {
  const [dirs, setDirs] = useState([])
  const [showImg, setShowImg] = useState(false)

  const listDirs = async () => {
    const entries = await readDir('images', { dir: BaseDirectory.Download, recursive: false })
    const downloadDirPath = await downloadDir();

    const files = entries.map((entry) => {
      return {
        path: `${downloadDirPath}${entry.name}`,
        name: entry.name
      }
    })

    setDirs(files)
  }

  return (
    <div className="container">
      <button onClick={() => {
        setShowImg(true)
        listDirs()
      }}>Click</button>
      { dirs.length > 0 &&
        dirs.map((dir) => <img key={dir.name} src={`images/${dir.name}`} />)
      }
      {
        showImg &&
        <img key="pexels-agustina-montanaro-12358386.jpg" src="home/oscar/Downloads/images/pexels-agustina-montanaro-12358386.jpg" alt='image' />
      }
    </div>
  );
}
