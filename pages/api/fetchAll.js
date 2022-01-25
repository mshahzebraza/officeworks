// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';

import path from 'path'
connect

const URL = 'http://localhost:27017/POList';


export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  const data = await fetch(URL);
  console.log(data);
  console.log('req.body');
  // console.log(req.body);
  // console.log(req.query);
  console.log(req.query);
  // const relDir = 'db/words.json'
  // const absDir = path.resolve('./public', relDir);
  // const data = fs.readFileSync(absDir)
  // console.log(absDir);
  res.status(200).json('data', data)
  // console.log(data);
}
