"use client"

import React, { useEffect, useMemo, useState } from "react";
import Breadcrump from "@/components/layouts/Breadcrump";
import Gallery from "@/components/pages/company/gallery/Gallery";
import { AboutGalleryImage, Feature, GalleryItem } from "@/types/types";
import { getBatchData } from "@/api/Api";
const page = () => {
  const [albums, setAlbums] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const features: Feature[] = [{ name: "about_gallery", amount: 100000 }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        setAlbums(data?.about_gallery?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const galleryImages = useMemo(() => {
    const flattened: (AboutGalleryImage & { albumTitle: string })[] = [];

    albums.forEach((album) => {
      (album.images ?? []).forEach((img) =>
        flattened.push({ ...img, albumTitle: album.title })
      );
    });

    return flattened;
  }, [albums]);

  return (
    <>
      <Breadcrump
        backgroundImage="/assets/images/breadcrump.jpg"
        title="Gallery"
        subtitle="Explore our portfolio of successful projects and installations"
      />
      <Gallery albums={albums} images={galleryImages}/>
    </>
  );
};

export default page;
