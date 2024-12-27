import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";

const tierList = [
  {
    id: 1,
    letter: "S",
    images: [],
    color: "bg-red-500",
  },
  {
    id: 2,
    letter: "A",
    images: [],
    color: "bg-orange-300",
  },
  {
    id: 3,
    letter: "B",
    images: [],
    color: "bg-yellow-300",
  },
  {
    id: 4,
    letter: "C",
    images: [],
    color: "bg-yellow-500",
  },
  {
    id: 5,
    letter: "D",
    images: [],
    color: "bg-green-300",
  },
];

type Tier = {
  id: number;
  letter: string;
  images?: File[] | null;
  color: string;
};

const TierList = () => {
  const [tierImages, setTierImages] = useState<File[]>([]);
  const [tiers, setTiers] = useState<Tier[]>(tierList);

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files);

      setTierImages((prevImages) => [...prevImages, ...imageArray]);
    }
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetTierId: number
  ) => {
    event.preventDefault();
    const sourceTierId = event.dataTransfer.getData("tierId");
    const sourceImageIndex = event.dataTransfer.getData("imageIndex");

    // If the image is from the "Add Image" section
    if (sourceTierId === "null") {
      const imageIndex = event.dataTransfer.getData("imageIndex");
      if (imageIndex !== null && imageIndex !== "") {
        const droppedImage = tierImages[parseInt(imageIndex, 10)];
        if (droppedImage) {
          setTiers((prevTiers) =>
            prevTiers.map((tier) =>
              tier.id === targetTierId
                ? { ...tier, images: [...(tier.images || []), droppedImage] }
                : tier
            )
          );
        }
      }
    } else {
      // If the image is being moved from another tier
      const sourceId = parseInt(sourceTierId, 10);
      const sourceImageIdx = parseInt(sourceImageIndex, 10);
      const sourceTier = tiers.find((tier) => tier.id === sourceId);
      const targetTier = tiers.find((tier) => tier.id === targetTierId);

      if (sourceTier && targetTier) {
        const sourceImage = sourceTier.images
          ? sourceTier.images[sourceImageIdx]
          : null;

        if (sourceImage) {
          // If the source and target tiers are the same, do nothing
          if (sourceId === targetTierId) {
            return; // Do nothing if the image is dropped in the same tier
          }

          // Move image from source to target without replacing any images
          setTiers((prevTiers) =>
            prevTiers.map((tier) =>
              tier.id === sourceId
                ? {
                    ...tier,
                    images: tier.images?.filter(
                      (_, index) => index !== sourceImageIdx
                    ),
                  }
                : tier.id === targetTierId
                ? {
                    ...tier,
                    images: [...(tier.images || []), sourceImage],
                  }
                : tier
            )
          );
        }
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  // Handle drag start for an image
  const handleDragStart = (
    event: React.DragEvent<HTMLImageElement>,
    tierId: number | null,
    imageIndex: number | null
  ) => {
    event.dataTransfer.setData("tierId", tierId?.toString() || "null");
    event.dataTransfer.setData("imageIndex", imageIndex?.toString() || "null");
  };
  return (
    <>
      <h1>Tierrify</h1>

      <section className="overflow-clip rounded-lg mt-6 w-ful max-w-screen-xl bg-zinc-900">
        {tiers.map(({ id, letter, images, color }) => (
          <div
            key={id}
            className="h-20 flex items-center w-full"
            onDrop={(event) => handleDrop(event, id)}
            onDragOver={handleDragOver}
          >
            <div
              className={`text-zinc-900 h-full w-24 flex justify-center items-center ${color.toString()}`}
            >
              <h2>{letter}</h2>
            </div>
            <div className="w-full flex justify-center items-center">
              {images && images.length > 0 ? (
                images.map((image, index) => (
                  <img
                    key={index}
                    draggable
                    src={URL.createObjectURL(image)}
                    alt={`Tier ${letter}`}
                    className="h-16 w-16 object-cover rounded m-1"
                    onDragStart={(event) => handleDragStart(event, id, index)}
                  />
                ))
              ) : (
                <p className="text-gray-400">Drop images here</p>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="p-4 overflow-clip rounded-lg mt-6 w-ful max-w-screen-xl bg-zinc-900">
        <div className="flex flex-col items-start">
          <h2>Add Image</h2>
          <Input
            type="file"
            multiple
            onChange={handleAddImage}
            className="border border-none"
          />
        </div>
        <div className="min-h-20 mt-3">
          <div className="flex flex-row items-center gap-2">
            {tierImages.map((image, index) => (
              <div key={index} className="flex items-center p-4">
                <img
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData("imageIndex", index.toString());
                    event.dataTransfer.setData("tierId", "null");
                  }}
                  className="h-16 w-16 object-cover rounded "
                  src={URL.createObjectURL(image)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TierList;
