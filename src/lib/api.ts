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

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "").replace("-", " ");
  console.log("realSlug: ", realSlug);
  //const mdPath = join(postsDirectory, `${realSlug}.md`);


  const allMds = allMdFiles();
  console.log("Found md files: ", allMds);

  const mdPath = allMds.find(element => element.endsWith(realSlug +".md"))
  if (mdPath != null) {
    const fileContents = fs.readFileSync(mdPath, "utf8");

    console.log("fileContents: ", fileContents);
    const { data, content } = matter(fileContents);

    console.log("data: ", data);

  return { ...data, slug: realSlug, content } as Post;
  }

}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  console.log("all slugs: ", slugs);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
