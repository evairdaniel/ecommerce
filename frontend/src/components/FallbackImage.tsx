
type FallbackImageProps = {
  src: string;
  alt: string;
};

const FallbackImage: React.FC<FallbackImageProps> = ({ src, alt }) => {
  const fallbackImage = "/images/produto-sem-foto.png";


  return (
    <img
      src={src || fallbackImage}
      alt={alt}
      className="w-full h-48 object-contain rounded-lg mb-2"
    />
  );
};

export default FallbackImage;
