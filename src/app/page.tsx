'use client';

import styles from "./page.module.css";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { Search } from "./components/Search/Search";
import { scrapeLinkedInProfile } from "./services/scraper";
import Resume from "./components/Resume/Resume";
import { Loader } from "./components/Loader/Loader";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async (input: string) => {
    setIsLoading(true);
    try {
      if (input.match('/linkedin\.com\/in\//g')?.length == 0){
        throw new Error('Validation error: please check the URL provided')
      }
      const result = await scrapeLinkedInProfile(input);
      setData(result);
    } catch {
      alert('Something went wrong: please check the URL provided or try again later');
    }
    setIsLoading(false);
  }

  // Default values shown  

  return (
    <main className={styles.main}>
      <div className={styles.border}>
        <div className={styles.description}>
          <div className={styles.card}>
            <h2>
              LinkedIn Resume Generator
            </h2>
          </div>
        </div>
        <div>
        </div>

        <div className={styles.center}>
          <div className={styles.description}>
            <Search updateInput={updateData}/>
          </div>
        </div>

        <div className={styles.download}>
          {isLoading ? 
            <Loader/>
            : !!data ? 
            (<button className={styles.button}>
              <div>
                <PDFDownloadLink document={<Resume data={data}/>} fileName="resume.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
              </div>
            </button>) : null
          }
        </div>

      </div>
    </main>
  );
}
