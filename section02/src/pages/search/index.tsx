import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookData } from "@/types";

// export const getStaticProps = async (context: GetStaticPropsContext) => {

//     const q = context.query.q;
//     const books = await fetchBooks(q as string);


//     return {
//         props: {
//             books,
//         },
//     };
// };

export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    if (q) {
        fetchSearchResult()
    }

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q]);

    return (
        <div>
            {books.map((book) => <BookItem key={book.id} {...book} />)}
        </div>
    );
}

Page.getLayout = (page: React.ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
}