import { useEffect, useRef, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import Menu from "../Menu/Menu";
import Image from "../Image/Image";

import "./Viewport.css";

function Viewport() {
  const image = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [color, setcolor] = useState("#fff");
  const [showImg, setShowImg] = useState(true);

  const getImage = async () => {
    console.log("get image called");
    setImgUrl(" ");
    const url = "https://source.unsplash.com/400x400/?asthetic";
    await fetch(url)
      .then((data) => {
        setImgUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getImage();
  }, []);

  function getColor(color) {
    console.log("getColor called");
    setcolor(color);
  }

  function setVisibility() {
    console.log("visibility changed");
    setShowImg(!showImg);
  }

  function download() {
    console.log("download called");
    let imageName = new Date().getMilliseconds();
    exportComponentAsJPEG(image, { fileName: imageName });
  }

  console.log("viewport rendered");

  return (
    <>
      <div className="Viewport">
        <Image
          imgUrl={imgUrl}
          showImg={showImg}
          color={color}
          ref={image}
        ></Image>
      </div>
      <Menu
        handleDownload={download}
        handleImage={getImage}
        handleVisibilty={setVisibility}
        handleColor={getColor}
        defaultColor={color}
        showImg={showImg}
      ></Menu>
    </>
  );
}

export default Viewport;
