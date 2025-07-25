"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(formData: FormData) {
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    console.log(bookId, content, author);


    if (!bookId || !content || !author) {
        return;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: "POST",
                body: JSON.stringify({ bookId, content, author }),
            }
        );
        console.log(response.status);

        // // 1. 특정 주소에 해당하는 페이지만 재검증
        // revalidatePath(`/book/${bookId}`);

        // // 2. 특정 경로의 모든 동적 페이지를 재검증
        // revalidatePath("/book/[id]", "page");

        // // 3. 특정 레이아웃을 갖는 모든 페이지를 재검증
        // revalidatePath("/(with-searchbar)", "layout");

        // // 4. 모든 데이터 재검증
        // revalidatePath("/", "layout");

        // 5. 태그 기준, 데이터 캐시 재검증: 이게 가장 좋음. 왜냐하면 다른 것들은 그 페이지의 모든 데이터 캐시를 새로고침 하는데 이 방법은 리뷰 데이터 캐시만 딱 삭제해서 훨씬 경제적임.
        revalidateTag(`review-${bookId}`);
    } catch (err) {
        console.error(err);
        return;
    }
}