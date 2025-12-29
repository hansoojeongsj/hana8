import { type NextRequest, NextResponse } from 'next/server';
import { books } from '../bookdata';

type Params = {
  params: Promise<{ bookId: string }>;
};

export async function GET(_req: NextRequest, { params }: Params) {
  const { bookId } = await params;
  const book = books.find((book) => book.id === Number(bookId));

  // if (!book) return notFound();
  if (!book)
    return NextResponse.json(
      { msg: `Not Found ${bookId}`, error: 404 },
      { status: 404 },
    );

  return NextResponse.json(book);
}
