"use server"
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Post } from "@/interfaces/post";

const postsDirectory = join(process.cwd(), "_notes");

function allMdFiles(): string[] {
  const mdFiles: string[] = [];

  function search(directory: string) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = join(directory, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        search(filePath); // Recursively search subdirectories
      } else if (filePath.endsWith(".md")) {
        mdFiles.push(filePath);
      }
    });
  }

  search(postsDirectory);
  return mdFiles;
}

export async function getPostSlugs() {
    const allMd = allMdFiles();
    const slugs:string[] = [];
    allMd.forEach(file =>{
        const parts = file.split('/');
        file = parts[parts.length - 1];
        file = file.replaceAll(' ', '%20');
        slugs.push(file);
    })
    // console.log("All slugs: ", slugs);

  return slugs;
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "").replaceAll("%20", " ");
  //console.log("realSlug: ", realSlug);
  //const mdPath = join(postsDirectory, `${realSlug}.md`);


  const allMds = allMdFiles();
  //console.log("Found md files: ", allMds);

  const mdPath = allMds.find(element => element.endsWith(realSlug +".md"))
  // console.log(mdPath);
  if (mdPath != null) {
    const fileContents = fs.readFileSync(mdPath, "utf8");

   // console.log("fileContents: ", fileContents);
    const { data, content } = matter(fileContents);

    //console.log("data: ", data);

  return { ...data, slug: realSlug, content } as Post;
  }

}

export default async function getAllPosts(){
  const slugs = await getPostSlugs();
  const posts: any = [];
  for(let i =0; i < slugs.length; ++i)
  {
    posts.push(await getPostBySlug(slugs[i]));
  }
  return posts;
}
