import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown-styles.module.css";
import Container from "@/app/_components/Container/container";
import PostHeader from "@/app/_components/PostHeader/postHeader";
import Link from "next/link";

export default async function Notes({ params }: { params: { post: string } }) {
  const post = getPostBySlug(params.post);
  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  return (
    <main>
      <Container>
        <PostHeader header = "Hello" /> 
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
      <Link href="/notes">Navigate back to all Notes</Link>
    </main>
  );
}
