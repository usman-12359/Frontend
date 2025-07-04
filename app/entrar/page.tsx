
import SignIn from '@/components/login';
import { SEO_DESCRIPTION } from '@/utils/enum/page';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Entrar | Chegou-sua-encomenda",
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
  return <SignIn />
}

export default page
