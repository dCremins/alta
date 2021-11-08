// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { join } from 'path';

type Data = {
  name: string
}
export type Post = {
  id: string;
  title: string;
  author:string;
  date:string;
  preview:string;
  copy: string[];
  links?: {text:string; url:string}[];
  video?:"https://youtu.be/ToQzmt2r2Ic",
  image?:string
}

const postPath = join(process.cwd(), 'pages/api/fakePosts.json');

export function sanitizeTitle(title:string) {
  return title
    .replace(/_/g, '-') // standardize underscores to dashes
    .replace(/[^a-zA-Z0-9\s]/g, '') // strip special characters
    .replace(/( - )/g, '-') // account for existing dashes
    .replace(/\s/g, '-') // whitespace
    .toLowerCase()
}

export function getPosts() {
  const posts: Post[] = [];
  try {
    const file = fs.readFileSync(postPath);
    if(!file){
      throw new Error('Post File not found');
    }
    const data:{posts:Post[]} = JSON.parse(file.toString());
    // Order by date in DESC order
    return data.posts.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date1 > date2 ? -1 : 1;
    }).map(p=>{
      return {
        ...p,
        id: sanitizeTitle(p.title)
      }
    })
  } catch (error) {
    console.error(error);
    return posts;
  }
}

export function getPostData(title: string) {
  try {
    const file = fs.readFileSync(postPath);
    if(!file){
      throw new Error('Post File not found');
    }
    const {posts}  = JSON.parse(file.toString());
    return posts.find((p:Post)=>sanitizeTitle(p.title) === title);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getAllPostIds() {
  const posts: Post[] = [];
  try {
    const file = fs.readFileSync(postPath);
    if(!file){
      throw new Error('Post File not found');
    }
    const data:{posts:Post[]} = JSON.parse(file.toString());
    // Order by date in DESC order
    return data.posts.map(p=>{return {
      params: {
        id: sanitizeTitle(p.title)
      }
    }})
  } catch (error) {
    console.error(error);
    return posts;
  }
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
