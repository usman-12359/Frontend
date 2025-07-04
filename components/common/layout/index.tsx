"use client"
import React, { ReactNode } from 'react';
import styles from "./layout.module.scss";
import Navigation from '../navbar';
import Footer from '../footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className="w-full flex flex-col items-center justify-start">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
