#!/usr/bin/env ts-node
import * as fs from 'fs';

const folder = '.';

type File = { name: string, path: string };

function readDirRecursively(dir: string): File[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  return dirents
    .map(dirent => dirent.isDirectory() ? readDirRecursively(`${dir}/${dirent.name}`) : [{ name: dirent.name, path: dir }])
    .reduce((acc, file) => [...acc, ...file], []);
}

const files = readDirRecursively(folder);
files.forEach(file => console.log(`${file.path}/${file.name}`));
const str = files.reduce((acc, file) => acc + `${file.path}/${file.name}\n`, "");
fs.writeFileSync('test.txt', str);