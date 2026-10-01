import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/BlogIndex";
import {
  blogIndexMetadata,
  blogPageCount,
  parseBlogPageNumber,
} from "@/lib/blog-index";

/** Unknown numbers, including /blog/page/1, 404. Page 1 stays at /blog. */
export const dynamicParams = false;

export function generateStaticParams() {
  const count = blogPageCount();
  const params: { number: string }[] = [];
  for (let page = 2; page <= count; page += 1) {
    params.push({ number: String(page) });
  }
  return params;
}

type Props = { params: Promise<{ number: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = parseBlogPageNumber((await params).number);
  if (page == null || page < 2 || page > blogPageCount()) {
    return { title: "Guide not found" };
  }
  return blogIndexMetadata(page);
}

export default async function BlogIndexPaged({ params }: Props) {
  const page = parseBlogPageNumber((await params).number);
  if (page == null || page < 2 || page > blogPageCount()) notFound();
  return <BlogIndex page={page} />;
}
