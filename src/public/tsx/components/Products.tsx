import * as React from "react";
import Dropzone from "react-dropzone";
import _JSXStyle from "styled-jsx/style";
import IFile from "../interfaces/File.interface";
// import { isTemplateElement } from "babel-types";

interface IProps {
  imageFiles?: IFile[];
  imageNum?: number;
  products?: object[];

  imageDrop(files: File[]): void;
  imagePreviewSelect(n: number): void;
  imageRemoveSelect(n: number): void;
  getProducts(): Promise<void>;
  storeProduct(e: React.FormEvent<HTMLElement>): Promise<void>;
}

export default class Products extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getProducts();
  }

  public render() {
    return[
      <h2 className="mb-3" key={0}>Produkty</h2>,
      <h5 key={1}>Vložiť produkt</h5>,
      <div className="row" key={2}>
        <div className="col-8 mb-3">
          <form key={2} onSubmit={(e) => { this.props.storeProduct(e); }}>
            <div className="form-row align-items-center">
              <div className="col-12">
                <h6>Základné informácie</h6>
              </div>
              <div className="col-6">
                <label className="sr-only" htmlFor="title">Názov Produktu</label>
                <input type="text" className="form-control mb-2" id="title" placeholder="Názov Produktu" required />
              </div>
              <div className="col-6">
                <label className="sr-only" htmlFor="title">Kategória</label>
                <select className="custom-select form-control mb-2" id="category" defaultValue={"0"}>
                  <option value={0}>Kategórie</option>
                  <option value={1}>Masťovky a Kelímky</option>
                  <option value={2}>Odberníky</option>
                  <option value={3}>Petriho misky</option>
                  <option value={4}>Skúmavky</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="col-12">
                <label className="sr-only" htmlFor="description">Stručné Info.</label>
                <textarea className="form-control mb-2" id="description" placeholder="Stručné Info." required />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="col-12">
                <h6>Technické parametre</h6>
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="length">Dĺžka</label>
                <input
                  type="number"
                  className="form-control mb-2" id="length" placeholder="Dĺžka v mm" min="10" max="100" required />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="wide">Širka</label>
                <input
                  type="number"
                  className="form-control mb-2" id="wide" placeholder="Šír. v mm" min="10" max="100" required />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="depth">Hĺbka</label>
                <input
                  type="number"
                  className="form-control mb-2" id="depth" placeholder="Hĺb. v mm" min="10" max="100"  required/>
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="weight">Objem</label>
                <input
                  type="number"
                  className="form-control mb-2" id="volume" placeholder="Obj. v ml" min="0" max="1000" required />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="weight">Váha</label>
                <input
                  type="number"
                  className="form-control mb-2" id="weight" placeholder="Váha v g" min="0" max="1000" required />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="boxsize">Veľkosť krab. v cm</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="boxsize" placeholder="Veľ krab. v cm" min="0" max="1000" required />
              </div>
              <div className="col-3">
                <label className="sr-only" htmlFor="package">Balené po ks.</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  id="package" placeholder="Balené po ks." min="0" max="1000" required />
              </div>
            </div>
            <div className="form-row align-items-center">
              <div className="col-12">
                <button type="submit" className="btn btn-primary mb-2">Pridať produkt</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-4 mb-3">
          <div className="d-flex flex-column">
            <img
              className="previewImg"
              src={
                this.props.imageFiles && this.props.imageFiles.length > 0 ?
                this.props.imageFiles[this.props.imageNum].preview : "../assets/images/no-image-icon.png"
              }
              title={
                this.props.imageFiles && this.props.imageFiles.length > 0 ?
                this.props.imageFiles[this.props.imageNum].name : ""
              }
            />
            <ul className="previewList d-flex justify-content-start">
              {
                this.props.imageFiles && this.props.imageFiles.length > 0 ?
                this.props.imageFiles.map((item, i) => (
                  <li key={item.name}>
                    <button
                      className="deleteImage"
                      onClick={() => { this.props.imageRemoveSelect(i); }}>&times;</button>
                    <button onClick={() => { this.props.imagePreviewSelect(i); }}>
                      <img src={item.preview} />
                    </button>
                  </li>
                )) : null
              }
            </ul>
            <Dropzone
              accept="image/png"
              onDrop={this.props.imageDrop}
              style={dropZoneStyle}>
              <p>Presuň sem fotografie, alebo sem klikni pre upload.</p>
            </Dropzone>
          </div>

          <_JSXStyle styleId={"previewImg"} css={`
            .previewImg {
              display: block;
              margin: 0 auto 1rem auto;
              max-height: 150px;
            }
          `} />
          <_JSXStyle styleId={"previewList"} css={`
            .previewList {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 50px;
              margin-bottom: .5rem;
            }
            .previewList li {
              float: left;
              /*border: 1px solid #55bee3;*/
              margin: 0 .5rem;
              position: relative;
            }
            .previewList li button {
              border: 0;
            }
            .previewList li .deleteImage {
              background-color: #dc3545;
              border-radius: 50%;
              color: #fff;
              position: absolute;
              top: -.5rem;
              right: -.5rem;
              width: 20px;
              height: 20px;
              padding: 0;
              margin: 0;
              line-height: 0;
            }
            .previewList li img {
              width: 50px;
            }
          `} />
        </div>
      </div>,
      <h5 key={3}>Zoznam produktov</h5>,
      <div key={4}>
        <div className="row">
          <div className="col-3">Názov</div>
          <div className="col-3">Kategória</div>
          <div className="col-3">Informácie</div>
        </div>
        {
          this.props.products && this.props.products.length > 0 ?
          this.props.products.map((item) => {
            return(
              <div className="row">
                <div className="col-3">{(item as any).title}</div>
                <div className="col-3">{(item as any).category}</div>
                <div className="col-3">{(item as any).info}</div>
              </div>
            );
          }) : <p>Neboli nájdené žiadne produkty</p>
        }
      </div>,
    ];
  }
}

const dropZoneStyle: object = {
  alignItems: "center",
  border: "2px dashed #55bee3",
  borderRadius: ".5rem",
  display: "flex",
  height: "100%",
  marginTop: ".5rem",
  padding: ".5rem",
};
