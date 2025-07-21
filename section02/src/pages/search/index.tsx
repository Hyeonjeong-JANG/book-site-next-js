import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import books from "@/mock/books.json"

export default function Page() {
    return <div>
        {books.map((book) => <BookItem key={book.id} {...book} />)} 
    </div>;
}

Page.getLayout = (page: React.ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
}