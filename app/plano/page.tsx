import UpgradePlan from '@/components/upgrade-plan/page';
import { SEO_DESCRIPTION } from '@/utils/enum/page';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Atualizar Planos | Chegou-sua-encomenda",
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
  return <UpgradePlan />
}
