This is a simple example of reordering of columns in a table using angular directives.
Basically this application uses 3 directives, myTable, draggable and droppable.
The diective angTable is an element directive, where it has an attribute named conf
The attribute 'conf'may contain an object consisting of head where we specify the table headers and one array of objects.
Directive named draggable has 3 attributes:
  drag:which specify a function defined which get fired when the dragging starts
  dragData:which specify the text to be transfered as the content of dragged element
  dragImage:the id of the element which ghost image should appear as the drag feedback
Directive named droppable has 1 attributes:
  drop:which specify a function defined which get fired when the drop occurs  