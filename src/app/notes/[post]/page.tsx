import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown-styles.module.css";
import Container from "@/app/_components/Container/container";
import PostHeader from "@/app/_components/PostHeader/postHeader";
import PreviewMdFile from "@/app/_components/PreviewMdFile/previewMdFile";
import Link from "next/link";
import Header from "@/app/_components/Header/header";

export default async function Notes({ params }: { params: { post: string } }) {
  const post = await getPostBySlug(params.post);
  if (!post) {
    return notFound();
  }

  let content = await markdownToHtml(post.content || "");
  const title = post.title;

  const regex = /\[\[(.*?)\]\]/g;
  const matches = content.match(regex);
  console.log(matches);

  if (matches) {
    for (let i = 0; i < matches.length; ++i) {
      const temp = matches[i].split("[[")[1];
      const ttle = temp.substring(0, temp.length - 2);
      const index = content.indexOf(matches[i]);
      const len = matches[i].length;
      const tmp =
        content.substring(0, index) +
        `\n<strong><a href="/notes/${ttle.replaceAll(" ", "%20")}">` +
        ttle +
        "</a></strong>\n" +
        content.substring(index + len, content.length);
      console.log(tmp);
      content = tmp;
    }
  }
  return (
    <main>
      <Header />
      <Container>
        <PostHeader header={post.title} />
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div style={{ marginTop: "40px" }}>
          <strong>
            <Link href="/notes">Navigate back to all Notes</Link>
          </strong>
        </div>
      </Container>
    </main>
  );
}
