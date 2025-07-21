// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();
  // 위의 코드는 API 요청이 직렬로 되기 때문에 allBooks 데이터를 받고 나서 recoBooks를 받음
  // 병렬로 바꾸면 한 번에 된다. 아래를 보라.
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};
export default function Home({ allBooks, recoBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}