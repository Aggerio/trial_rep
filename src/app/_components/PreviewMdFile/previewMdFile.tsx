"use client";
import Link from "next/link";
import Container from "../Container/container";
import { useState } from "react";

export default function PreviewMdFile({
  title,
  shortcontent,
  slug
}: {
  title: string;
  shortcontent: string;
  slug: string
}) {
  const [hoverEnabled, setHover] = useState(false);

  function setHoverEnabled(event: any) {
    setHover(true);
    // console.log("Hovered");
  }
  function setHoverDisabled(event: any) {
    setHover(false);
    // console.log("Hovered cancelled");
  }
  //TODO: fix the Link
  return (
    <Container>
      <div >
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
            <div dangerouslySetInnerHTML={{ __html:  shortcontent  }} />
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

