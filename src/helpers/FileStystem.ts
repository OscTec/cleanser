import { readDir, BaseDirectory, readBinaryFile, createDir, removeDir, copyFile, removeFile } from '@tauri-apps/api/fs'
import { pictureDir } from '@tauri-apps/api/path'
import { Directory } from '../interfaces/Directory';
import { Image } from '../interfaces/Image'

export const fetchImageDirectories = async (): Promise<Directory[]> => {
  const entries = await readDir('images', { dir: BaseDirectory.Picture, recursive: false })
  const pictureDirPath = await pictureDir();

  const directories = entries.map((entry) => {
    return {
      path: `${pictureDirPath}${entry.name}`,
      name: entry.name
    }
  })

  return directories
}

const getBlob = async (directory: string): Promise<string> => {
  const contents = await readBinaryFile(directory, { dir: BaseDirectory.Picture })
  const blob = new Blob([contents])
  const srcBlob = URL.createObjectURL(blob)

  return srcBlob
}

export const fetchFilesFromDirectory = async (directory: string): Promise<Image[]> => {
  const entries = await readDir(`images/${directory}`, { dir: BaseDirectory.Picture, recursive: false })
  const pictureDirPath = await pictureDir();

  console.log('directory: ', directory)
  console.log('entries: ', entries)

  const files = await  Promise.all(entries.map(async (entry) => {
    return {
      path: `${pictureDirPath}${entry.name}`,
      dir: directory,
      name: entry.name,
      srcBlob: await getBlob(`images/${directory}/${entry.name}`)
    }
  }))

  return files
}

export const createDirectory = async (directoryName: string) => {
  await createDir(`images/${directoryName}`, { dir: BaseDirectory.Picture, recursive: true });
}

export const deleteDirectory = async (directoryName: string) => {
  await removeDir(`images/${directoryName}`, { dir: BaseDirectory.Picture });
}

export const moveFile = async (file: string, currentDir: string, targetDir: string) => {
  await copyFile(`images/${currentDir}/${file}`, `images/${targetDir}/${file}`, { dir: BaseDirectory.Picture })
  await removeFile(`images/${currentDir}/${file}`, { dir: BaseDirectory.Picture });
}