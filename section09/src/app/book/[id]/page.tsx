import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";


async function BookDetail({ bookId }: { bookId: string }) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}
// export const dynamicParams = false; // false: 아래의 1, 2, 3 빼고 모두 404가 뜨게 하기
export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
if(!response.ok){
  throw new Error(response.statusText);
}

const books:BookData[]= await response.json();

  return books.map((book)=>({
    id: book.id.toString(),
  }));
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`
  );
  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();


  return (
    <section>
      {reviews.map((review) => <ReviewItem key={`review-item-${review.id}`} {...review} />)}
    </section>
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (<div className={style.container}>
    <BookDetail bookId={id} />
    <ReviewEditor bookId={id} />
    <ReviewList bookId={id} />
  </div>);
}
