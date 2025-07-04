import Subscriber from '@/components/subscriber/page'
import { SEO_DESCRIPTION } from '@/utils/enum/page';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Assinante | Chegou-sua-encomenda",
    description: SEO_DESCRIPTION.DESCRIPTION,
    icons: {
      icon: {
        url: "/logo.svg",
        type: "image/svg",
      },
      shortcut: { url: "/logo.svg", type: "image/svg" },
    },
  };

export default function page() {
  return <Subscriber />
}
