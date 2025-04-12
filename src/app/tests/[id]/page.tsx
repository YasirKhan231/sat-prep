import { Metadata } from "next";
import TestComponent from "@/components/TestComponent";

interface Props {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({ params }: Props) {
  return <TestComponent testId={params.id} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Test ${params.id}`,
    description: "SAT Practice Test",
  };
}

export const dynamicParams = true;
