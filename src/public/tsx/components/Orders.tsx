import * as React from "react";

interface IProps {
  temporaryProps?: any;
}

export default class Products extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return(
      <h2>Objednávky</h2>
    );
  }
}
