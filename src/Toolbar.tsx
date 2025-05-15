type Props = {
  isEditing: boolean;
  handleUndoLastMove: () => void;
  handleEditToggle: () => void;
};

export const Toolbar = ({
  handleUndoLastMove,
  handleEditToggle,
  isEditing,
}: Props) => {
  return (
    <div className="toolbar">
      <h2>Toolbar</h2>

      <button onClick={handleUndoLastMove}>Undo Last move</button>

      <button onClick={handleEditToggle}>
        {isEditing ? "Save Points" : "Edit Points"}
      </button>

      {/* <button onClick={handleSaveShape}>Save Shape</button> */}
    </div>
  );
};
