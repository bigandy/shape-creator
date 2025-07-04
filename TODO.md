# Todo List

## ClickArea - Snap to Existing Shapes coordinates i.e. same x or same y as existing point

### v2

- [x] Bug - Line creation snapping flip-flaps as current point trying to snap to multiple points when moving it. Wow, what a bug!
- [x] Use translate for GridLines

### v3

- [ ] Minor Bug - Circle snapping points not quite snapped
- [ ] Move Single shape and snap??
- [ ] Keep aspect ratio of shape when moving center point of shape
- [ ] Look at Performance?!
- [ ] move xPoints, yPoints into provider and also snap setting

### v1

- [x] Snap at the edge of the Click Area?
- [x] Show grid lines on Line when creating shape (is this a good idea?)
- [x] line creation change color when hovering near a grid line
- [x] Snap to line when creating a shape
- [x] circle creation add points when moving mouse
- [x] rectangle creation add points when moving mouse
- [x] snap grid not showing on line mode
- [x] if a point is within a specific distance, highlight that the point is close by changing its background style
- [x] if a point is within a specific distance, snap the point being moved to that point
- [x] UI lines e.g. like Photoshop lines
- [x] UI Toggle to specify if user wants snapping

## Testing

- [ ] Investigate options for testing

## Styles

- [ ] Think about styles
- [ ] Use modular self-contained styles. CSS / CSS-in-JS / SCSS??

## DragAndDropPoints

- [x] Fix bug in moving positions of points (following the change to a centered click area.)
- [ ] when moving a point, hide the number in .mouse-position.
- [ ] Different style of .mouse-position

## General

- [ ] Save to localStorage a set of shape(s)
- [ ] Custom Image(s)
- [ ] Hover over point / shape in sidebar - could show something in the main click-area to show that shape is being edited??
- [x] Toast messages for e.g. when copied text to clipboard / error messages etc
- [x] Extract the clipPathStyle into a re-usable hook useClipPathStyle
- [x] Move components into src/components directory

## Sidebar - Drag and Drop Shapes

- [x] Remove re-ordering as not useful at all!
- [x] Re-order shapes in sidebar by dragging and dropping

## ClickArea - use Translate not left/right/top/bottom positioning

- [x] use translate rather than left/right/top/bottom positioning for performance

## Sidebar - Duplicate shape

- [x] Think about having the Ability to duplicate a shape
- [x] A button in the sidebar, then where does the new shape go?
- [x] Click the button and then the new shape is in move mode so the user can move to where they want it

## Sidebar - combine move and edit

- [x] Combine move and edit so that the user can do either and it is less confusing

## ClickArea - Moving Existing Shapes

- [x] Keyboard move shapes / points
- [x] Bug - center point can be outside of viewport if all shapes moved - set a max/min position
- [x] bug - single shape moving broken.
- [x] Move one shape
  - [x] Line
  - [x] Rectangle
  - [x] Circle
- [x] Move all Shapes i.e. drag a selector and move all the points in the selected area by the amount that the selected area moves by.

## Code Viewer

- [x] Height changes when adding more shapes. Need to fix the height so not causing the main click area to jump.
- [x] Button in CodeViewer that creates a codepen with the code

## Circle

- [x] Refactor coords to use % as elsewhere in app.

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
