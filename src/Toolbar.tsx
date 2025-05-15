type Props = {
  isEditing: boolean;
  handleRemoveLastPoint: () => void;
  handleEditToggle: () => void;
  handleReset: () => void;
};

export const Toolbar = ({
  handleRemoveLastPoint,
  handleEditToggle,
  isEditing,
  handleReset,
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

        {/* <button onClick={handleSaveShape}>Save Shape</button> */}
      </div>
    </div>
  );
};
