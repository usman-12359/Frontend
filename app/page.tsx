import React from 'react'
import { Metadata } from 'next';
import Home from '@/components/home';
import { SEO_DESCRIPTION } from '@/utils/enum/page';

export const metadata: Metadata = {
  title: "Início | Chegou-sua-encomenda",
  description: SEO_DESCRIPTION.DESCRIPTION,
  icons: {
    icon: {
      url: "/logo.svg",
      type: "image/svg",
    },
    shortcut: { url: "/logo.svg", type: "image/svg" },
  },
};

const page = () => {
  return (
    <Home />
  )
}

export default page
