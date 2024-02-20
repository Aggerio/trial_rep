import Container from "../_components/Container/container";
import Header from "../_components/Header/header";
import { getAllPosts } from "@/lib/api";
import styles from './Notes.module.css';

export default function Notes() {
  const allNotes = getAllPosts();
  if (allNotes.length == 0) {
    // TODO: add support for empty thingy
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
              placeholder="Search..."
              className={styles.search_input}
            />
          </div>

          
        </Container>
      </main>
    </div>
  );
}
