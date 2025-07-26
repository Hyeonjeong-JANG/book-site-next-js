import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Metadata } from "next";
import { title } from "process";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  // const resolvedSearchParams = await searchParams;
  // const q = Array.isArray(resolvedSearchParams.q) ? resolvedSearchParams.q[0] : resolvedSearchParams.q ?? "";


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );


  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }


  const books: BookData[] = await response.json();


  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({ searchParams, }: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q}: 한입북스 검색`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `${q}: 한입북스 검색`,
      description: `${q}의 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string; };
}) {
  return (
    <Suspense key={searchParams.q} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}