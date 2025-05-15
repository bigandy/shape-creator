type Props = {
  isEditing: boolean;
  selectedImage?: string;
  handleRemoveLastPoint: () => void;
  handleEditToggle: () => void;
  handleReset: () => void;
  handleImageChange: (imageUrl: string) => void;
  handleSaveShape: () => void;
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
  handleRemoveLastPoint,
  handleEditToggle,
  handleReset,
  handleImageChange,
  handleSaveShape,
}: Props) => {
  return (
    <div className="toolbar">
      <h2>Toolbar</h2>

      <div className="buttons">
        <button onClick={handleRemoveLastPoint}>Remove Last Point</button>

        <button onClick={handleEditToggle}>
          {isEditing ? "Save Points" : "Edit Points"}
        </button>

        <button onClick={handleReset}>Reset</button>

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
      </div>
    </div>
  );
};
