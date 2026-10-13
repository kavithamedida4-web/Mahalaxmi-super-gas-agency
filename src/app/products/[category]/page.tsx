import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return [
    { category: 'stoves' },
    { category: 'gas-stoves-bhattis' },
    { category: 'regulators' },
    { category: 'supergas-regulators-hoses' },
    { category: 'spares' },
    { category: 'burners-knobs-jet-pins' },
    { category: 'cylinders' },
    { category: 'lpg-cylinders' },
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  redirect(`/products?category=${category}`);
}
