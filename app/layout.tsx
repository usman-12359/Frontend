"use client"
import AdminLayout from "@/components/common/admin-layout/page";
import Layout from "@/components/common/layout";
import ProgressBar from "@/components/common/progressBar";
import ClickScrollToTop from "@/components/common/scrollToTop";
import { Routes } from "@/routes";
import { resetUserState } from "@/store/reducers/userReducer";
import { store } from "@/store/store";
import { AuthComp, findLayoutComp } from "@/utils/custom-functions";
import { SessionProvider, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import "./pagination.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  const pathname = usePathname();
 

  useEffect(() => {
  const handleTabClose = () => {
    
    signOut({ redirect: false });
    store.dispatch(resetUserState());
    
   
    if (navigator.sendBeacon) {
      const data = new FormData();
      navigator.sendBeacon('/api/logout', data);
    }
  };

  // Use pagehide for better mobile support
  window.addEventListener('pagehide', handleTabClose);
  
  // For desktop browsers
  window.addEventListener('unload', handleTabClose);

  return () => {
    window.removeEventListener('pagehide', handleTabClose);
    window.removeEventListener('unload', handleTabClose);
  };
}, [store.dispatch]);

 
  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <Provider store={store}>
          {pathname != "/" && pathname != Routes.FORGOT_PASSWORD && pathname != Routes.LOGIN && pathname != Routes.PROFILE && pathname != Routes.ADMIN && pathname != Routes.SUBSCRIBER && pathname != Routes.VIEW_RECIPIENTS && pathname != Routes.CONDOMINIO && pathname != Routes.SIGNUP && <ProgressBar />}
          <ToastContainer
            position="top-left"
            autoClose={7000}
            style={{ zIndex: 100000 }}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <ClickScrollToTop />
          {findLayoutComp(pathname)
            ?
            <Layout>
              {children}
            </Layout>
            : AuthComp(pathname) ?
              children :
              <AdminLayout>
                {children}
              </AdminLayout>
          }
        </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
