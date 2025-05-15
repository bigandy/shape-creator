type Props = {
  isEditing: boolean;
  selectedImage?: string;
  useAllShapes: boolean;
  handleRemoveLastPoint: () => void;
  handleEditToggle: () => void;
  handleResetCurrentStack: () => void;
  handleResetAllStacks: () => void;
  handleImageChange: (imageUrl: string) => void;
  handleSaveShape: () => void;
  handleUseAllShapesToggle: () => void;
};

const possibleImages = [
  {
    title: "me 1",
    url: "https://picsum.photos/seed/me1/1200/1300",
  },
  {
    title: "me 2",
    url: "https://picsum.photos/seed/me2/1200/1300",
  },
  {
    title: "me 3",
    url: "https://picsum.photos/seed/me3/1200/1300",
  },
];

export const Toolbar = ({
  isEditing,
  selectedImage,
  useAllShapes,
  handleRemoveLastPoint,
  handleEditToggle,
  handleResetCurrentStack,
  handleResetAllStacks,
  handleImageChange,
  handleSaveShape,
  handleUseAllShapesToggle,
}: Props) => {
  return (
    <div className="toolbar">
      <h2>Toolbar</h2>

      <div className="buttons">
        <button onClick={handleRemoveLastPoint}>Remove Last Point</button>

        <button onClick={handleEditToggle}>
          {isEditing ? "Save Points" : "Edit Points"}
        </button>

        <button onClick={handleResetCurrentStack}>Reset Current Shape</button>

        <button onClick={handleResetAllStacks}>Reset All Shapes</button>

        <select onChange={handleImageChange} value={selectedImage}>
          <option value=""></option>
          {possibleImages.map((image, index) => {
            return (
              <option value={image.url} key={`image-${index}`}>
                {image.title}
              </option>
            );
          })}
        </select>

        <button onClick={handleSaveShape}>Save Shape</button>

        <button onClick={handleUseAllShapesToggle}>
          {useAllShapes ? "One Shape" : "All Shapes"}
        </button>
      </div>
    </div>
  );
};
