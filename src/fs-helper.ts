import * as core from '@actions/core'
import {promises as fs} from 'fs'

// Adding the error interface which will be used for type-checking
interface NodeJSError extends Error {
  code?: string;
}

export async function readFiles(fileNames: string[]): Promise<string[]> {
  const fileContents: string[] = []

  for (const fileName of fileNames) {
    try {
      const contents = await fs.readFile(fileName, 'utf8')

      fileContents.push(contents)
    } catch (error) {
      // error is now of type NodeJSError
      const err = error as NodeJSError;
      if (err.code === 'ENOENT') {
        core.debug(`File ${fileName} not found!`)
      } else {
        throw error;
      }
    }
  }

  return fileContents
}
