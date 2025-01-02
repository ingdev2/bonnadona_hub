"use client";

import React from "react";

import { Col } from "antd";

import ButtonAuth from "@/components/auth/ButtonAuth";

import "../app/globals.css";
import UsersLoginPage from "./login/page";

const HomePage: React.FC = () => {
  return (
    <UsersLoginPage />
    // <div
    //   className="homepage"
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     display: "flex",
    //     flexFlow: "column wrap",
    //   }}
    // >
    //   <div
    //     className="background-page"
    //     style={{
    //       position: "fixed",
    //       width: "100%",
    //       height: "100%",
    //       backgroundImage: "url('/background/back-soft-blue-lines-wave.jpg')",
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //       opacity: 0.4,
    //     }}
    //   />

    //   <div
    //     className="content-homepage"
    //     style={{
    //       zIndex: 1,
    //       display: "flex",
    //       flexFlow: "column wrap",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       minHeight: "100vh",
    //     }}
    //   >
    //     <div
    //       className="bonna-logo"
    //       style={{
    //         position: "absolute",
    //         top: "22px",
    //         right: "22px",
    //       }}
    //     >
    //       <img
    //         src="/logos/LOGO-BONNADONA.png"
    //         alt="Logo de Bonnadona"
    //         style={{ width: "170px" }}
    //       />
    //     </div>

    //     <Col
    //       xs={24}
    //       lg={24}
    //       style={{
    //         padding: "0px 7px",
    //         width: "100vw",
    //         maxWidth: "450px",
    //         minWidth: "231px",
    //       }}
    //     >
    //       <div
    //         className="bonnadona-hub-logo fade-in"
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           paddingBlock: "1px",
    //         }}
    //       >
    //         <img
    //           src="/logos/logo_vertical.png"
    //           alt="Logo de Bonnadona HUB"
    //           style={{ width: "50%", marginBottom: "30px" }}
    //         />
    //       </div>

    //       <div className="text">
    //         <h3
    //           className="presentation-text"
    //           style={{
    //             textAlign: "center",
    //             fontWeight: "bold",
    //             lineHeight: 1.3,
    //             marginBottom: 15,
    //           }}
    //         >
    //           Plataforma de acceso a las aplicaciones internas de la Clínica Bonnadona
    //         </h3>
    //         <div
    //           className="auth-button"
    //           style={{ display: "flex", justifyContent: "center" }}
    //         >
    //           <ButtonAuth />
    //         </div>
    //       </div>
    //     </Col>
    //   </div>
    // </div>
  );
};

export default HomePage;
