import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'My thoughts on things.',
};

export default function Blog() {
  return (
    <h1 className="font-extrabold text-3xl">Blog</h1>
  )
}