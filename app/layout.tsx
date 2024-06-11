"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles.scss";
import Header from "@/components/Header/Header";
import { AppWrapper } from "@/context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./styles.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Footer from "@/components/Footer/Footer";
<script src="../path/to/flowbite/dist/flowbite.min.js"></script>

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={theme}>
              <AppWrapper>
                <div className="root-layout">
                  <Header />
                  <div style={{ paddingLeft: "10%", paddingRight: "10%", minHeight: '80vh' }}>{children}</div>
                  <Footer />
                </div>
              </AppWrapper>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
