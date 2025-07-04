import TermsAndConditions from '@/components/terms-and-conditions';
import { SEO_DESCRIPTION } from '@/utils/enum/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Termos e Condições | Chegou-sua-encomenda",
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
  return <TermsAndConditions />
}
