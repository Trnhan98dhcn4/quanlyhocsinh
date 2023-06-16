import HeaderComponent from "./header";
import MainComponent from "./main";
import NavbarComponent from "./navbar";

interface IChildren {
  children: JSX.Element;
}

export default function LayoutComponent({ children }: IChildren) {
  return (
    <div>
      <HeaderComponent />
      <div className="d-flex container mt-2">
        <NavbarComponent />
        <MainComponent>{children}</MainComponent>
      </div>
    </div>
  );
}
