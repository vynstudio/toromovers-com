import { BlogIndex } from "@/components/BlogIndex";
import { blogIndexMetadata } from "@/lib/blog-index";

export const metadata = blogIndexMetadata(1);

export default function BlogIndexPage() {
  return <BlogIndex page={1} />;
}
