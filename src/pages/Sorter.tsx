import { useEffect, useRef, useState } from "react";

import { fetchFilesFromDirectory, fetchImageDirectories, moveFile } from "../helpers/FileStystem";

import DirectoryList from "../components/DirectoryList";
import ImageScrollBar from "../components/ImageScrollBar";
import ImageViewer from '../components/ImageViewer'

import { Directory } from "../interfaces/Directory";
import { Image } from '../interfaces/Image'

import "../css/App.css";
import TagBar from "../components/TagBar";
import { loopArrayIndex } from "../utils/util";

export default function Folder() {
  const [dirs, setDirs] = useState<Directory[]>([])
  const [activeDir, setActiveDir] = useState<string>('')
  const [images, setImages] = useState<Image[]>([])
  const [imageIndex, setImageIndex] = useState<number>(0)
  const [moveDirectory, setMoveDirectory] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null)
  const tagBarRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    (async() => {
      const files = await fetchFilesFromDirectory(activeDir)
      setImages(files)
    })()
  }, [activeDir])

  useEffect(() => {
    (async() => {
      const directories = await fetchImageDirectories()
      setDirs(directories)
      setActiveDir(directories[0].name)
    })()
  }, [])

  function incrementDirectory(incr: number) {
    const currentDirIndex = dirs.findIndex((dir) => dir.name === activeDir)
    const nextDirIndex = loopArrayIndex(currentDirIndex, dirs.length, incr)
    setActiveDir(dirs[nextDirIndex].name)
  }

  const handleKeyDown = async (e: { key: string; }) => {
    switch (e.key) {
      case 'ArrowRight':
        setImageIndex(loopArrayIndex(imageIndex, images.length, 1))
        break
      case 'ArrowLeft':
        setImageIndex(loopArrayIndex(imageIndex, images.length, -1))
        break
      case 'ArrowUp': {
        setImageIndex(0)
        incrementDirectory(-1)
        break
      }
      case 'ArrowDown': {
        setImageIndex(0)
        incrementDirectory(1)
        break
      }
      case 'Enter':
        if (moveDirectory) {
          await moveImage()
        }
        break
      case 'Backspace':
        if (moveDirectory.length === 0) {
          tagBarRef.current?.blur()
          ref.current?.focus()
        }
        break
      case 'Delete':
        if (moveDirectory.length <= 1) {
          tagBarRef.current?.blur()
          ref.current?.focus()
        }
      default:
        tagBarRef.current?.focus()
        ref.current?.blur()
        break;
    }
  };

  useEffect(() => {
    listRef.current?.children[imageIndex]?.scrollIntoView({ inline: 'center', behavior: 'smooth' });
  }, [imageIndex])

  useEffect(() => {
    ref.current?.focus();
  }, []);

  async function moveImage() {
    if (dirs.find((dir) => dir.name === moveDirectory)) {
      await moveFile(images[imageIndex].name, activeDir, moveDirectory)
      const files = await fetchFilesFromDirectory(activeDir)
      setImages(files)
    }
  }

  return (
    <div style={styles.container} ref={ref} tabIndex={-1} onKeyDown={handleKeyDown}>
      <TagBar listItems={dirs.map(dir => dir.name)} moveDirectory={moveDirectory} setMoveDirectory={setMoveDirectory} ref={tagBarRef} />
      <div style={styles.bodyContainer as React.CSSProperties}>
        <DirectoryList directories={dirs} activeDir={activeDir} setActiveDir={setActiveDir} setImageIndex={setImageIndex} setDirs={setDirs} />
        <div style={styles.content as React.CSSProperties}>
          <ImageViewer images={images} imageIndex={imageIndex}/>
          <ImageScrollBar images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} ref={listRef} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '720px',
    width: '1280px',
    backgroundColor: 'blue'
  },
  bodyContainer: {
    display: 'flex',
    height: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#313639',
    flexGrow: 0,
    maxWidth: '75%',
    // height: '100%'
  }
}