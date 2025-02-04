import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "./Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Navbar />
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
