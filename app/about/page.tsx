import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About',
  description: 'Data engineer.',
};

export default function About() {
  return (
      <h1 className="font-extrabold text-3xl pl-20">About</h1>
  )
}