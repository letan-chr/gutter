import React from 'react'
import { cookies } from 'next/headers';
import Breadcrump from '@/components/layouts/Breadcrump';
import Document from '@/components/pages/company/strategy/Document';
import { getPageData } from '@/data/utils';
import { Language } from '@/data/utils';
import { getAllDocumentCategories, getAllDocuments } from '@/api/Api';

const page = async () => {
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language")?.value;
  const lang: Language =
    languageCookie === "en" || languageCookie === "am" ? languageCookie : "en";

  const data = getPageData("document", lang);

  // ✅ Fetch API data on server
  const [documentsRes, categoriesRes] = await Promise.all([
    getAllDocuments(),
    getAllDocumentCategories(),
  ]);

  return (
    <>
      <Breadcrump
        backgroundImage="/assets/images/breadcrump.jpg"
        title={data.title}
        subtitle={data.description}
      />
      <Document
        unResolvedDocuments={documentsRes.data}
        unResolvedCategories={categoriesRes.data}
      />
    </>
  );
}

export default page