import * as React from "react";

interface IProps {
  getOrders(): Promise<void>;

}

export default class Products extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getOrders();
  }

  public render() {
    return[
      <h2 key={0}>Zoznam Objednávok</h2>,
      <div className="list-group mb-3" key={1}></div>,
    ];
  }
}
