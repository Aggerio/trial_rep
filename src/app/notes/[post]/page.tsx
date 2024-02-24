import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown-styles.module.css";
import Container from "@/app/_components/Container/container";
import PostHeader from "@/app/_components/PostHeader/postHeader";
import Link from "next/link";
import Header from "@/app/_components/Header/header";

export default async function Notes({ params }: { params: { post: string } }) {
  const post = await getPostBySlug(params.post);
  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  const title = post.title;
  return (
    <main>
        <Header/>
      <Container>
        <PostHeader header = {post.title} /> 
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />

      <div style={{marginTop: "40px"}}>
      <strong ><Link href="/notes">Navigate back to all Notes</Link></strong>
</div>
      </Container>
    </main>
  );
}
