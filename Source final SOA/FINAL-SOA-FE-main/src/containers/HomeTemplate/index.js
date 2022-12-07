import React from 'react';
import { Route } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import FooterHome from './_components/Footer';
import NavbarHome from './_components/Navbar';

export default function HomeTemplate(props) {
  const { exact, path, component } = props;

  return (
    <>
      <NavbarHome />
      <Route exact={exact} path={path} component={component} />
      <FooterHome />
      <ScrollToTop smooth style={{ width: 50, height: 50, backgroundColor:"#ffffffcc" }} />
    </>
  )
}
