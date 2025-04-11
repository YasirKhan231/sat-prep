import { Metadata } from "next";
import TestComponent from "@/components/TestComponent";

// Define the params type
export type PageParams = {
  id: string;
};

// Main page component
export default function Page({ params }: { params: PageParams }) {
  return <TestComponent testId={params.id} />;
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  return {
    title: `Test ${params.id}`,
    description: "SAT Practice Test",
  };
}

// Enable dynamic params
export const dynamicParams = true;
