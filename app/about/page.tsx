import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About',
  description: 'Data engineer.',
};

export default function About() {
  return (
		<h1 className="font-bold text-3xl">About</h1>
  )
}