import { type NextRequest, NextResponse } from 'next/server';
import { books } from './bookdata';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const searchStr = searchParams.get('q') ?? '';

  return NextResponse.json(
    books.filter((book) => book.title.includes(searchStr)),
  );
}

export async function GET1(req: NextRequest) {
  const { host, hostname, pathname, origin, basePath, searchParams } =
    req.nextUrl;

  return NextResponse.json({
    host,
    hostname,
    pathname,
    origin,
    basePath,
    searchParams,
    message: searchParams.get('message'),
  });
}

// GET POST FETCH PUT DELETE OPTIONS ...
