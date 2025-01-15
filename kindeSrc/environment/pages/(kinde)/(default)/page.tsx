"use server";

import { getKindeWidget, type KindePageEvent } from "@kinde/infrastructure";
import React from "react";
import { renderToString } from "react-dom/server.browser";
import Layout from "../../layout";

const styles: {
  container: React.CSSProperties;
  sidePanel: React.CSSProperties;
  loginForm: React.CSSProperties;
} = {
  container: {
    display: "flex",
    height: "100vh",
  },

  sidePanel: {
    borderRadius: "1rem",
    backgroundColor: "dodgerblue",
    flex: 1,
    margin: "0.5rem",
  },
  loginForm: {
    minWidth: "400px",
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Layout context={context} request={request}>
      <div style={styles.container}>
        <div>
          <h2>{context.widget.content.heading}</h2>
          <p>{context.widget.content.description}</p>
        </div>
        <main style={styles.loginForm}>{getKindeWidget()}</main>
        <div style={styles.sidePanel}></div>
      </div>
    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
