import { ImageBase, Stack, Text } from "@fluentui/react";
import { IMAGE_URL } from "utils/constants";

interface ImageProps {
  available: boolean | string | null;
  src: string;
  alt: string;
  imgClassName?: string;
  notAvailableClassName?: string;
  notAvailableText?: string;
}

const Image = ({
  available,
  src,
  alt,
  imgClassName = "",
  notAvailableClassName = "",
  notAvailableText = "Imagen no disponible",
}: ImageProps) => {
  return (
    <>
      {Boolean(available) ? (
        <ImageBase
          src={`${IMAGE_URL}/${src}`}
          alt={alt}
          className={imgClassName}
        />
      ) : (
        <Stack className={notAvailableClassName}>
          <Text>{notAvailableText}</Text>
        </Stack>
      )}
    </>
  );
};

export default Image;
