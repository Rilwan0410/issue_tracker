import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Container } from "@radix-ui/themes";
import Navbar from "./Navbar";
import AuthProvider from "./api/auth/AuthProvider";

export default function RootLayout({ children }) {
  // console.log(session)
  return (
    <html lang="en">
      <body>
        <Theme accentColor="mint" grayColor="gray" appearance="dark">
          <Navbar />
          <main className="p-5">
            <Container>
              <AuthProvider>{children}</AuthProvider>
            </Container>
          </main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
