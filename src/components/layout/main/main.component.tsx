interface IChildren {
  children: JSX.Element;
}

export default function MainComponent({ children }: IChildren) {
  return <div className="col-9">{children}</div>;
}
