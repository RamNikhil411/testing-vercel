import React, { useState, useRef, useCallback } from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "../ui/button";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { scale } from "motion/react";

const ImagePreview = ({
  src,
  setSrc,
  setPreviewSrc,
  setFile,
}: {
  src: string | undefined;
  setSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPreviewSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const onCropComplete = useCallback((c: Crop) => {
    setCompletedCrop(c);
    if (imgRef.current && previewCanvasRef.current && c.width && c.height) {
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const scaleX = image.naturalWidth / image.width;

      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      console.log(image.naturalWidth, image.naturalHeight);
      console.log(image);
      console.log(scaleX, scaleY);

      if (!ctx) return;

      canvas.width = c.width;
      canvas.height = c.height;

      ctx.drawImage(
        image,
        c.x * scaleX,
        c.y * scaleY,
        c.width * scaleX,
        c.height * scaleY,
        0,
        0,
        c.width,
        c.height
      );
    }
  }, []);

  return (
    <AlertDialog open={!!src}>
      <AlertDialogContent>
        <AlertDialogTitle>Edit Profile Image</AlertDialogTitle>
        {src && (
          <>
            <div className="flex items-center justify-center">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={onCropComplete}
                aspect={1}
                circularCrop
                className="w-fit"
              >
                <img
                  ref={imgRef}
                  src={src}
                  alt="Preview"
                  style={{
                    maxHeight: "400px",
                    width: "auto",
                    maxWidth: "100%",
                    display: "block",
                  }}
                />
              </ReactCrop>
            </div>
            <canvas ref={previewCanvasRef} style={{ display: "none" }} />
          </>
        )}
        <div className=" flex justify-end gap-2">
          <Button
            onClick={() => setSrc(undefined)}
            className="bg-transparent hover:bg-transparent text-gray-600 border border-gray-600"
          >
            Cancel
          </Button>
          <Button
            className="bg-lime-600 text-white hover:bg-lime-600"
            onClick={() => {
              if (!completedCrop || !previewCanvasRef.current) {
                return;
              }
              const canvas = previewCanvasRef.current;

              canvas.toBlob((blob) => {
                if (!blob) return;
                const file = new File([blob], "cropped-image.png", {
                  type: "image/png",
                });

                setFile(file);
                const previewUrl = URL.createObjectURL(file);
                setPreviewSrc(previewUrl);
                setSrc(undefined);
              }, "image/png");
            }}
          >
            Save
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImagePreview;
