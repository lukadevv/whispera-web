import Logo from "../atoms/Logo";
import NavigationLinks from "../molecules/NavigationLinks";
import NavigationUser from "../molecules/NavigationUser";

export default function NavigationBar() {
  return (
    <div className="pb-12">
      <nav className="fixed w-full bg-opacity-90 bg-gray-800 backdrop-blur-sm z-20">
        <div className="max-w-[1100px] flex justify-between m-auto px-4">
          <Logo />
          <NavigationLinks />
          <NavigationUser />
        </div>
      </nav>
    </div>
  );
}
