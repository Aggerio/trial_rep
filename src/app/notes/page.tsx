"use client";
import Container from "../_components/Container/container";
import Header from "../_components/Header/header";
import NotesWidget from "../_components/NotesWidget/notesWidget";
import styles from "./Notes.module.css";
import { useState, useEffect } from "react";
import getAllPosts from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { Post } from "@/interfaces/post";

type notesList = {
  Post: Post[];
};

export default function Notes() {
  const [searchTerm, setSearch] = useState('');
  const [notesList, setNotesList] = useState<notesList[] | null>();

  useEffect(() => {
    const fetchAllPosts = async () => {
      let allNotes: any = {};
      try {
        let data = await getAllPosts();
        allNotes = data;
        for(let i = 0; i < allNotes.length; ++i)
        {
          allNotes[i]['content'] = await markdownToHtml(allNotes[i]['content']);
        }
        setNotesList(allNotes);
      } catch (error) {
        console.log("Error: ", error);
      }

      return { allNotes };
    };

    fetchAllPosts();
  }, []);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  if (searchTerm.length > 0) {
    setNotesList(
      notesList &&
        notesList.filter((note: any) => {
          return note.content.match(searchTerm);
        })
    );
  }

  return (
    <div>
      <Header />
      <main>
        <Container>
          <h2> Working Notes</h2>
          <br />
          <br />
          <p>
            Here's a compilation of books I've read. The ones marked with star
            are must reads, and those marked with two are re reads. Check my
            Antilibrary for the bigger list :)
          </p>

          <div className={styles.search_container}>
            <input
              type="text"
              placeholder="🔍 Search Notes"
              className={styles.search_input}
              // onChange={handleChange}
            />
          </div>
          {notesList &&
            notesList.map((note: any, index: any) => {
              return (
                <NotesWidget key={index}
                  title={note["title"]}
                  shortcontent={note["content"]}
                  slug = {note['slug']}
                />
              );
            })}

        </Container>
      </main>
    </div>
  );
}
