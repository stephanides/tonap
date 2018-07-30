import * as React from "react";
import Dropzone from "react-dropzone";
import _JSXStyle from "styled-jsx/style";

import IFile from "../../interfaces/File.interface";

interface IProps {
  imageFiles?: IFile[];
  imageNum?: number;

  imageDrop(files: File[]): void;
  imagePreviewSelect(n: number): void;
  imageRemoveSelect(n: number): void;
}

export default (props: IProps) => (
  <div className="d-flex flex-column">
    <img
      className="previewImg"
      src={
        props.imageFiles && props.imageFiles.length > 0 ?
        props.imageFiles[props.imageNum].preview : "../assets/images/no-image-icon.png"
      }
      title={
        props.imageFiles && props.imageFiles.length > 0 ?
        props.imageFiles[props.imageNum].name : ""
      }
    />
    <ul className="previewList d-flex justify-content-start">
      {
        props.imageFiles && props.imageFiles.length > 0 ?
        props.imageFiles.map((item, i) => (
          <li key={item.name}>
            <button
              className="deleteImage"
              onClick={() => { props.imageRemoveSelect(i); }}>&times;</button>
            <button onClick={() => { props.imagePreviewSelect(i); }}>
              <img src={item.preview} />
            </button>
          </li>
        )) : null
      }
    </ul>
    <Dropzone
      accept="image/png"
      onDrop={props.imageDrop}
      style={dropZoneStyle}>
      <p>Presuň sem fotografie, alebo sem klikni pre upload.</p>
    </Dropzone>

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
);

const dropZoneStyle: object = {
  alignItems: "center",
  border: "2px dashed #55bee3",
  borderRadius: ".5rem",
  display: "flex",
  height: "100%",
  marginTop: ".5rem",
  padding: ".5rem",
};
