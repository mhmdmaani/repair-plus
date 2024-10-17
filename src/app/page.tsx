import HomePage from '@/modules/home/HomePage';
import { Metadata, ResolvingMetadata } from 'next';
import { PrismaClient } from 'prisma/prisma-client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    include: {
      devices: {
        where: {
          isActive: true,
          isFeatured: true,
        },
        orderBy: {
          order: 'desc',
        },
      },
    },
  });
  const brands = await prisma.brand.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    orderBy: {
      order: 'desc',
    },
  });

  await prisma.$disconnect();
  const generatedBrandsKeywords = brands.map((brand) => brand.name).join(', ');
  const generatedCategoriesKeywords = categories
    .map((cat) => cat.name)
    .join(', ');

  return {
    title: `Repair Plus | Hem`,
    description:
      'Repair Plus erbjuder professionella och snabba reparationstjänster för mobiltelefoner, surfplattor, bärbara datorer och andra elektroniska enheter. Våra experttekniker erbjuder pålitliga reparationer för alla stora varumärken och ser till att dina enheter återställs till perfekt skick. Bekvämt, prisvärt och betrott över hela Sverige.',
    keywords: `Repair Plus, ${generatedBrandsKeywords}, ${generatedCategoriesKeywords}, reparation, elektronik, prylar, Sverige, Trollhättan`,
  };
}

export default async function Home() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    orderBy: {
      order: 'desc',
    },
    include: {
      devices: {
        where: {
          isActive: true,
          isFeatured: true,
        },
        orderBy: {
          order: 'desc',
        },
      },
    },
  });
  const brands = await prisma.brand.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const activeBrands = await prisma.brand.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const activeReviews = await prisma.review.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  await prisma.$disconnect();

  return (
    <HomePage
      categories={categories}
      featuredBrands={brands}
      activeBrands={activeBrands}
      reviews={activeReviews}
    />
  );
}
