"use client";
import Link from "next/link";
import Container from "../Container/container";
import { useState, useEffect } from "react";
import { Post } from "@/interfaces/post";
import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";


type post = {
  Pst: Post;
};

export default function PreviewMdFile({
//   title,
//   shortcontent,
  slug
}: {
  slug: string;
}) {
  const [hoverEnabled, setHover] = useState(false);
  const [title, setTitle] = useState('');
  const [shortcontent, setShortContent] = useState('');

  function setHoverEnabled(event: any) {
    setHover(true);
    // console.log("Hovered");
  }
  function setHoverDisabled(event: any) {
    setHover(false);
    // console.log("Hovered cancelled");
  }
  useEffect(() => {
    const fetchInfo = async () => {
      let note: any = {};
      try {
        let data = await getPostBySlug(slug);
        note = data;
        // console.log(note);
        setTitle(note['title']);
        setShortContent(await markdownToHtml(note['content']));
      } catch (error) {
        console.log("Error: ", error);
      }

      return { note };
    };

    fetchInfo();
  }, []);

  return (
    <Container>
      <div>
        {hoverEnabled == true ? (
          <div
            style={{
              position: "fixed",
              width: "300px",
              height: "100px",
              backgroundColor: "white",
              overflow: "hidden",
              transform: "translate(0, 30px)",
              border: "1px solid black",
            }}
          >
            <strong>{title}</strong>
            <br />
            <div dangerouslySetInnerHTML={{ __html: shortcontent }} />
          </div>
        ) : (
          <div></div>
        )}
        <Link
          onMouseEnter={(event) => {
            setHoverEnabled(event);
          }}
          onMouseLeave={(event) => {
            setHoverDisabled(event);
          }}
          href={`/notes/${slug.replace(" ", "%20")}`}
        >
          <strong>{title}</strong>
        </Link>
      </div>
    </Container>
  );
}
