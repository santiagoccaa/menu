
import GetProducts from "@/lib/GetProducts";
import { Menu } from "@/modules";

export default function Home() {
  return (
    <>
      <header className="flext text-center p-4">
        <h1 className="text-2xl">Menu</h1>
      </header>
      <Menu />
      <GetProducts />
    </>
  );
}
