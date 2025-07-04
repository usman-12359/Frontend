import Profile from '@/components/profile/page';
import { SEO_DESCRIPTION } from '@/utils/enum/page';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Perfil | Chegou-sua-encomenda",
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
  return <Profile />
}
