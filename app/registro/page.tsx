import SignUp from '@/components/signup';
import { SEO_DESCRIPTION } from '@/utils/enum/page';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Registro | Chegou-sua-encomenda",
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
  return <SignUp />
}
