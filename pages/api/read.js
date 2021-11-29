// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';

import path from 'path'

export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  console.log('req.body');
  // console.log(req.body);
  // console.log(req.query);
  console.log(req.query);
  const relDir = 'db/words.json'
  const absDir = path.resolve('./public', relDir);
  const data = fs.readFileSync(absDir)
  // console.log(absDir);
  res.status(200).json(data)
  // console.log(data);
}
