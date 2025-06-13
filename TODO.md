# Todo List

## Testing

- [ ] Investigate options for testing

## Sidebar - Drag and Drop Shapes

- [ ] Remove re-ordering as not useful at all!
- [x] Re-order shapes in sidebar by dragging and dropping

## ClickArea - Moving Existing Shapes

- [x] Bug - center point can be outside of viewport if all shapes moved - set a max/min position
- [x] bug - single shape moving broken.
- [x] Move one shape
  - [x] Line
  - [x] Rectangle
  - [x] Circle
- [x] Move all Shapes i.e. drag a selector and move all the points in the selected area by the amount that the selected area moves by.

## Styles

- [ ] Think about styles
- [ ] Use modular self-contained styles. CSS / CSS-in-JS / SCSS??

## Code Viewer

- [x] Height changes when adding more shapes. Need to fix the height so not causing the main click area to jump.
- [x] Button in CodeViewer that creates a codepen with the code

## Circle

- [x] Refactor coords to use % as elsewhere in app.

## General

- [ ] Save to localStorage a set of shape(s)
- [ ] Custom Image(s)
- [ ] Hover over point / shape in sidebar - could show something in the main click-area to show that shape is being edited??
- [x] Toast messages for e.g. when copied text to clipboard / error messages etc
- [x] Extract the clipPathStyle into a re-usable hook useClipPathStyle
- [x] Move components into src/components directory

## DragAndDropPoints

- [x] Fix bug in moving positions of points (following the change to a centered click area.)
- [ ] when moving a point, hide the number in .mouse-position.
- [ ] Different style of .mouse-position

## ClickArea

- [x] When user clicks to create a circle/rectangle have some opacity on the black area.
- [x] Center the click area in the viewport
- [x] Handle the centered viewport in the setting of the points
- [x] Remove dots for Rectangle and Circle as not adding value

## ClickArea - Editing Existing Shapes

- [x] Fix Insert Point After (line mode)
- [x] Edit shape functionality
- [x] Circle Editor
- [x] Line Editor
- [x] Rectangle Editor

## Rectangle

- [x] Fix position of dots/rectangle during creation.

## Images

- [x] Store the images locally so there's a quicker loading time

## State

- [x] Bug: Create shape with Line, then create a Rectangle and "Edit Shape" on Rectangle in sidebar. Creates one too many shapes.
- [x] Bug: Create shape with Line, then create a Rectangle and "Delete Current Shape"
- [x] Bug: "Reset Current Shape" Line drawing, then try to change to another shape via toolbar
- [x] Move all shape setting into one state - should make editing easier?!
- [x] Use useReducer for Context
- [x] State into a Context?
