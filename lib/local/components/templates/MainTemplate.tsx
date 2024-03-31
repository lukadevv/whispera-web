import Footer from "../organisms/Footer";
import NavigationBar from "../organisms/NavigationBar";

export default function MainTemplate({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavigationBar />
      <main className="flex flex-col items-center max-w-[1100px] m-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
