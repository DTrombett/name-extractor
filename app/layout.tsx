import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const font = Noto_Sans({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: "Name Extractor",
	description: "Insert some names and let the fate choose one!",
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	generator: "Next.js",
	publisher: "Vercel",
	twitter: {
		card: "summary_large_image",
		creator: "DTrombett",
		images: "/preview.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white ${font.className}`}
			>
				{children}
			</body>
		</html>
	);
}
