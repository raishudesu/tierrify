import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";

const tiers = [
  {
    id: 1,
    letter: "S",
  },
  {
    id: 2,
    letter: "A",
  },
  {
    id: 3,
    letter: "B",
  },
  {
    id: 4,
    letter: "C",
  },
  {
    id: 5,
    letter: "D",
  },
  {
    id: 6,
    letter: "E",
  },
  {
    id: 7,
    letter: "F",
  },
];

const TierList = () => {
  const [tierImages, setTierImages] = useState<File[]>([]);
  //   const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  //   const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  //   const handleDragStart = (index: number) => {
  //     setDraggedItemIndex(index);
  //   };

  //   const handleDragOver = (index: number) => {
  //     if (draggedItemIndex === null) return;
  //     const draggedOverItem = items[index];
  //     if (draggedItemIndex === index) return;

  //     const updatedItems = [...items];
  //     const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);
  //     updatedItems.splice(index, 0, draggedItem);

  //     setDraggedItemIndex(index);
  //     setItems(updatedItems);
  //   };

  //   const handleDragEnd = () => {
  //     setDraggedItemIndex(null);
  //   };

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files);

      setTierImages((prevImages) => [...prevImages, ...imageArray]);
    }
  };

  return (
    <div>
      <h1>Tier List</h1>

      <section className="w-80">
        {tiers.map(({ id, letter }) => (
          <div key={id} className="h-20 flex border items-center">
            <div className="h-full border-r w-24 flex justify-center items-center">
              <h2>{letter}</h2>
            </div>
            <div className="w-full "></div>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <div className="flex flex-col items-start">
          <h2>Add Image</h2>
          <Input type="file" multiple onChange={handleAddImage} />
        </div>
        <div className="min-h-20 border mt-3">
          <div className="flex flex-row items-center gap-2">
            {tierImages.map((image, index) => (
              <div key={index} className="w-20 h-20 flex items-center p-4">
                <img draggable src={URL.createObjectURL(image)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
          style={{
            padding: "8px",
            border: "1px solid black",
            marginBottom: "4px",
            cursor: "move",
          }}
        >
          {item}
        </div>
      ))} */}
    </div>
  );
};

export default TierList;
